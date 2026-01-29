import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface AnalysisData {
    jobTitle: string;
    company: string;
    matchScore: number;
    potentialScore: number;
    summary: string;
    missingKeywords: string[];
    priorityActions: string[];
    atsTips: string[];
    createdAt?: string;
}

interface SectionFeedback {
    section: string;
    feedback: string;
    priority: string;
}

export async function exportToPDF(analysis: AnalysisData, sectionFeedback: SectionFeedback[]) {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = 25;

    // Helper: Add title
    const addTitle = (text: string, size = 22, color = [16, 185, 129]) => { // Emerald-500
        doc.setFontSize(size);
        doc.setTextColor(color[0], color[1], color[2]);
        doc.setFont('helvetica', 'bold');
        doc.text(text, margin, yPos);
        yPos += size / 2 + 5;
    };

    // Helper: Add subtitle / section header
    const addSectionHeader = (text: string) => {
        if (yPos > 260) {
            doc.addPage();
            yPos = 25;
        }
        doc.setFontSize(14);
        doc.setTextColor(31, 41, 55); // Gray-800
        doc.setFont('helvetica', 'bold');
        doc.text(text.toUpperCase(), margin, yPos);
        yPos += 8;
        doc.setDrawColor(229, 231, 235); // Gray-200
        doc.line(margin, yPos, margin + contentWidth, yPos);
        yPos += 10;
    };

    // Helper: Add body text
    const addBodyText = (text: string, size = 10, color = [75, 85, 99]) => { // Gray-600
        doc.setFontSize(size);
        doc.setTextColor(color[0], color[1], color[2]);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(text, contentWidth);

        if (yPos + (lines.length * (size / 2)) > 280) {
            doc.addPage();
            yPos = 25;
        }

        doc.text(lines, margin, yPos);
        yPos += (lines.length * (size / 2)) + 5;
    };

    // Helper: Add list items
    const addList = (items: string[]) => {
        items.forEach(item => {
            if (yPos > 275) {
                doc.addPage();
                yPos = 25;
            }
            doc.setFontSize(10);
            doc.setTextColor(75, 85, 99);
            doc.setFont('helvetica', 'normal');
            doc.text('•', margin, yPos);
            const lines = doc.splitTextToSize(item, contentWidth - 10);
            doc.text(lines, margin + 5, yPos);
            yPos += (lines.length * 5) + 2;
        });
        yPos += 5;
    };

    // --- Start Building PDF ---

    // Brand Header
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text('NEXTROVA - AI CAREER CO-PILOT', margin, 15);
    doc.text(new Date().toLocaleDateString(), pageWidth - margin - 20, 15);

    // Title & Job Info
    addTitle('Analysis Report');

    doc.setFontSize(12);
    doc.setTextColor(55, 65, 81);
    doc.setFont('helvetica', 'bold');
    doc.text(`${analysis.jobTitle}`, margin, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(`at ${analysis.company}`, margin, yPos);
    yPos += 15;

    // Scores
    doc.setFillColor(249, 250, 251); // Gray-50
    doc.roundedRect(margin, yPos, contentWidth / 2 - 5, 25, 2, 2, 'F');
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text('CURRENT MATCH SCORE', margin + 5, yPos + 8);
    doc.setFontSize(16);
    doc.setTextColor(16, 185, 129);
    doc.text(`${analysis.matchScore}%`, margin + 5, yPos + 18);

    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin + contentWidth / 2 + 5, yPos, contentWidth / 2 - 5, 25, 2, 2, 'F');
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text('POTENTIAL SCORE', margin + contentWidth / 2 + 10, yPos + 8);
    doc.setFontSize(16);
    doc.setTextColor(139, 92, 246); // Purple-500
    doc.text(`${analysis.potentialScore}%`, margin + contentWidth / 2 + 10, yPos + 18);
    yPos += 35;

    // Executive Summary
    addSectionHeader('Executive Summary');
    addBodyText(analysis.summary);
    yPos += 5;

    // Missing Keywords
    if (analysis.missingKeywords.length > 0) {
        addSectionHeader('Missing Keywords');
        addBodyText('Incorporate these keywords into your CV to improve ATS ranking:');
        addList(analysis.missingKeywords);
    }

    // Section Feedback
    addSectionHeader('Detailed Feedback');
    sectionFeedback.forEach(section => {
        if (yPos > 250) {
            doc.addPage();
            yPos = 25;
        }
        doc.setFontSize(11);
        doc.setTextColor(31, 41, 55);
        doc.setFont('helvetica', 'bold');
        doc.text(section.section.charAt(0).toUpperCase() + section.section.slice(1), margin, yPos);
        yPos += 6;
        addBodyText(section.feedback);
        yPos += 2;
    });

    // Priority Actions
    if (analysis.priorityActions.length > 0) {
        doc.addPage();
        yPos = 25;
        addSectionHeader('Priority Actions');
        addList(analysis.priorityActions);
    }

    // ATS Optimization Tips
    if (analysis.atsTips.length > 0) {
        addSectionHeader('ATS Optimization Tips');
        addList(analysis.atsTips);
    }

    // Footer
    const footerY = 285;
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text('Confidence and accuracy of AI analysis is dependent on the clarity of the source material provided.', margin, footerY);

    // Save PDF
    doc.save(`Nextrova_Analysis_${analysis.jobTitle.replace(/\s+/g, '_')}.pdf`);
}
