export interface JobData {
    title: string;
    company: string;
    location?: string;
    description: string; // clean, readable, structured
    requirements?: string[];
    responsibilities?: string[];
    skills?: string[];
}
