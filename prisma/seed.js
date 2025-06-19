"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Comprehensive list of US colleges and universities
const colleges = [
    // Ivy League
    { name: 'Harvard University', location: 'Cambridge, MA', type: 'Private', acceptanceRate: 4.6, tuition: 54768, enrollment: 31200 },
    { name: 'Yale University', location: 'New Haven, CT', type: 'Private', acceptanceRate: 6.2, tuition: 59950, enrollment: 12300 },
    { name: 'Princeton University', location: 'Princeton, NJ', type: 'Private', acceptanceRate: 5.8, tuition: 57410, enrollment: 8200 },
    { name: 'Columbia University', location: 'New York, NY', type: 'Private', acceptanceRate: 6.1, tuition: 65000, enrollment: 31200 },
    { name: 'University of Pennsylvania', location: 'Philadelphia, PA', type: 'Private', acceptanceRate: 8.4, tuition: 61710, enrollment: 21600 },
    { name: 'Brown University', location: 'Providence, RI', type: 'Private', acceptanceRate: 7.1, tuition: 62680, enrollment: 10200 },
    { name: 'Dartmouth College', location: 'Hanover, NH', type: 'Private', acceptanceRate: 8.8, tuition: 60870, enrollment: 6500 },
    { name: 'Cornell University', location: 'Ithaca, NY', type: 'Private', acceptanceRate: 10.6, tuition: 61815, enrollment: 24000 },
    // Top Public Universities
    { name: 'University of California, Berkeley', location: 'Berkeley, CA', type: 'Public', acceptanceRate: 14.4, tuition: 44115, enrollment: 42000 },
    { name: 'University of California, Los Angeles', location: 'Los Angeles, CA', type: 'Public', acceptanceRate: 10.8, tuition: 44115, enrollment: 45000 },
    { name: 'University of Michigan', location: 'Ann Arbor, MI', type: 'Public', acceptanceRate: 20.2, tuition: 52766, enrollment: 48000 },
    { name: 'University of Virginia', location: 'Charlottesville, VA', type: 'Public', acceptanceRate: 20.7, tuition: 54000, enrollment: 25000 },
    { name: 'University of North Carolina at Chapel Hill', location: 'Chapel Hill, NC', type: 'Public', acceptanceRate: 19.2, tuition: 37000, enrollment: 30000 },
    { name: 'University of Texas at Austin', location: 'Austin, TX', type: 'Public', acceptanceRate: 31.8, tuition: 40000, enrollment: 52000 },
    { name: 'University of Wisconsin-Madison', location: 'Madison, WI', type: 'Public', acceptanceRate: 51.7, tuition: 39000, enrollment: 45000 },
    { name: 'University of Illinois at Urbana-Champaign', location: 'Urbana, IL', type: 'Public', acceptanceRate: 59.7, tuition: 34000, enrollment: 52000 },
    // Top Private Universities
    { name: 'Stanford University', location: 'Stanford, CA', type: 'Private', acceptanceRate: 4.3, tuition: 56169, enrollment: 17000 },
    { name: 'Massachusetts Institute of Technology', location: 'Cambridge, MA', type: 'Private', acceptanceRate: 6.7, tuition: 57786, enrollment: 11500 },
    { name: 'California Institute of Technology', location: 'Pasadena, CA', type: 'Private', acceptanceRate: 6.4, tuition: 56000, enrollment: 2200 },
    { name: 'University of Chicago', location: 'Chicago, IL', type: 'Private', acceptanceRate: 6.2, tuition: 61781, enrollment: 17000 },
    { name: 'Northwestern University', location: 'Evanston, IL', type: 'Private', acceptanceRate: 7.2, tuition: 60000, enrollment: 22000 },
    { name: 'Duke University', location: 'Durham, NC', type: 'Private', acceptanceRate: 7.7, tuition: 60488, enrollment: 17000 },
    { name: 'Johns Hopkins University', location: 'Baltimore, MD', type: 'Private', acceptanceRate: 11.2, tuition: 58720, enrollment: 28000 },
    { name: 'Vanderbilt University', location: 'Nashville, TN', type: 'Private', acceptanceRate: 9.1, tuition: 56050, enrollment: 13000 },
    // Liberal Arts Colleges
    { name: 'Williams College', location: 'Williamstown, MA', type: 'Liberal Arts', acceptanceRate: 12.6, tuition: 61050, enrollment: 2100 },
    { name: 'Amherst College', location: 'Amherst, MA', type: 'Liberal Arts', acceptanceRate: 11.3, tuition: 61000, enrollment: 1850 },
    { name: 'Swarthmore College', location: 'Swarthmore, PA', type: 'Liberal Arts', acceptanceRate: 8.9, tuition: 56000, enrollment: 1600 },
    { name: 'Pomona College', location: 'Claremont, CA', type: 'Liberal Arts', acceptanceRate: 6.6, tuition: 56000, enrollment: 1700 },
    { name: 'Wellesley College', location: 'Wellesley, MA', type: 'Liberal Arts', acceptanceRate: 16.2, tuition: 61000, enrollment: 2400 },
    { name: 'Bowdoin College', location: 'Brunswick, ME', type: 'Liberal Arts', acceptanceRate: 9.1, tuition: 58000, enrollment: 1800 },
    { name: 'Carleton College', location: 'Northfield, MN', type: 'Liberal Arts', acceptanceRate: 18.2, tuition: 58000, enrollment: 2000 },
    { name: 'Middlebury College', location: 'Middlebury, VT', type: 'Liberal Arts', acceptanceRate: 15.7, tuition: 60000, enrollment: 2600 },
    // State Universities
    { name: 'University of California, San Diego', location: 'La Jolla, CA', type: 'Public', acceptanceRate: 34.3, tuition: 44115, enrollment: 42000 },
    { name: 'University of California, Davis', location: 'Davis, CA', type: 'Public', acceptanceRate: 46.3, tuition: 44115, enrollment: 39000 },
    { name: 'University of California, Irvine', location: 'Irvine, CA', type: 'Public', acceptanceRate: 28.9, tuition: 44115, enrollment: 36000 },
    { name: 'University of California, Santa Barbara', location: 'Santa Barbara, CA', type: 'Public', acceptanceRate: 29.2, tuition: 44115, enrollment: 26000 },
    { name: 'University of Washington', location: 'Seattle, WA', type: 'Public', acceptanceRate: 53.5, tuition: 39000, enrollment: 48000 },
    { name: 'University of Florida', location: 'Gainesville, FL', type: 'Public', acceptanceRate: 30.1, tuition: 28000, enrollment: 52000 },
    { name: 'University of Georgia', location: 'Athens, GA', type: 'Public', acceptanceRate: 40.0, tuition: 31000, enrollment: 39000 },
    { name: 'University of Maryland', location: 'College Park, MD', type: 'Public', acceptanceRate: 44.2, tuition: 39000, enrollment: 41000 },
    // Engineering & Tech Schools
    { name: 'Georgia Institute of Technology', location: 'Atlanta, GA', type: 'Public', acceptanceRate: 21.3, tuition: 33000, enrollment: 32000 },
    { name: 'University of California, Santa Cruz', location: 'Santa Cruz, CA', type: 'Public', acceptanceRate: 58.8, tuition: 44115, enrollment: 19000 },
    { name: 'Rensselaer Polytechnic Institute', location: 'Troy, NY', type: 'Private', acceptanceRate: 47.0, tuition: 58000, enrollment: 7500 },
    { name: 'Worcester Polytechnic Institute', location: 'Worcester, MA', type: 'Private', acceptanceRate: 59.4, tuition: 55000, enrollment: 7000 },
    { name: 'Stevens Institute of Technology', location: 'Hoboken, NJ', type: 'Private', acceptanceRate: 52.7, tuition: 56000, enrollment: 7000 },
    // Business Schools
    { name: 'New York University', location: 'New York, NY', type: 'Private', acceptanceRate: 16.2, tuition: 58000, enrollment: 52000 },
    { name: 'Boston University', location: 'Boston, MA', type: 'Private', acceptanceRate: 18.9, tuition: 61000, enrollment: 36000 },
    { name: 'University of Southern California', location: 'Los Angeles, CA', type: 'Private', acceptanceRate: 11.4, tuition: 64000, enrollment: 48000 },
    { name: 'Georgetown University', location: 'Washington, DC', type: 'Private', acceptanceRate: 14.5, tuition: 62000, enrollment: 19000 },
    { name: 'Carnegie Mellon University', location: 'Pittsburgh, PA', type: 'Private', acceptanceRate: 15.4, tuition: 58000, enrollment: 16000 },
    // More State Schools
    { name: 'University of Minnesota', location: 'Minneapolis, MN', type: 'Public', acceptanceRate: 70.0, tuition: 33000, enrollment: 52000 },
    { name: 'University of Colorado Boulder', location: 'Boulder, CO', type: 'Public', acceptanceRate: 78.9, tuition: 38000, enrollment: 37000 },
    { name: 'University of Arizona', location: 'Tucson, AZ', type: 'Public', acceptanceRate: 84.6, tuition: 36000, enrollment: 45000 },
    { name: 'Arizona State University', location: 'Tempe, AZ', type: 'Public', acceptanceRate: 88.2, tuition: 30000, enrollment: 74000 },
    { name: 'University of Oregon', location: 'Eugene, OR', type: 'Public', acceptanceRate: 83.4, tuition: 39000, enrollment: 22000 },
    { name: 'University of Utah', location: 'Salt Lake City, UT', type: 'Public', acceptanceRate: 79.4, tuition: 28000, enrollment: 33000 },
    { name: 'University of Iowa', location: 'Iowa City, IA', type: 'Public', acceptanceRate: 83.5, tuition: 31000, enrollment: 32000 },
    { name: 'University of Kansas', location: 'Lawrence, KS', type: 'Public', acceptanceRate: 92.5, tuition: 28000, enrollment: 28000 },
    // Additional Private Universities
    { name: 'Rice University', location: 'Houston, TX', type: 'Private', acceptanceRate: 9.5, tuition: 54000, enrollment: 7000 },
    { name: 'Emory University', location: 'Atlanta, GA', type: 'Private', acceptanceRate: 15.8, tuition: 55000, enrollment: 15000 },
    { name: 'Wake Forest University', location: 'Winston-Salem, NC', type: 'Private', acceptanceRate: 29.4, tuition: 58000, enrollment: 8000 },
    { name: 'Tufts University', location: 'Medford, MA', type: 'Private', acceptanceRate: 14.6, tuition: 62000, enrollment: 12000 },
    { name: 'Brandeis University', location: 'Waltham, MA', type: 'Private', acceptanceRate: 33.5, tuition: 60000, enrollment: 5800 },
    { name: 'Case Western Reserve University', location: 'Cleveland, OH', type: 'Private', acceptanceRate: 27.4, tuition: 55000, enrollment: 12000 },
    { name: 'Lehigh University', location: 'Bethlehem, PA', type: 'Private', acceptanceRate: 46.1, tuition: 58000, enrollment: 7000 },
    { name: 'Villanova University', location: 'Villanova, PA', type: 'Private', acceptanceRate: 28.2, tuition: 58000, enrollment: 11000 },
    // More Liberal Arts
    { name: 'Davidson College', location: 'Davidson, NC', type: 'Liberal Arts', acceptanceRate: 17.8, tuition: 55000, enrollment: 1900 },
    { name: 'Colgate University', location: 'Hamilton, NY', type: 'Liberal Arts', acceptanceRate: 17.2, tuition: 61000, enrollment: 3000 },
    { name: 'Hamilton College', location: 'Clinton, NY', type: 'Liberal Arts', acceptanceRate: 16.4, tuition: 60000, enrollment: 2000 },
    { name: 'Bates College', location: 'Lewiston, ME', type: 'Liberal Arts', acceptanceRate: 17.3, tuition: 58000, enrollment: 1800 },
    { name: 'Colby College', location: 'Waterville, ME', type: 'Liberal Arts', acceptanceRate: 8.9, tuition: 61000, enrollment: 2000 },
    { name: 'Oberlin College', location: 'Oberlin, OH', type: 'Liberal Arts', acceptanceRate: 33.8, tuition: 58000, enrollment: 2900 },
    { name: 'Grinnell College', location: 'Grinnell, IA', type: 'Liberal Arts', acceptanceRate: 23.2, tuition: 58000, enrollment: 1700 },
    { name: 'Kenyon College', location: 'Gambier, OH', type: 'Liberal Arts', acceptanceRate: 34.3, tuition: 62000, enrollment: 1700 },
    // Additional Public Universities
    { name: 'University of Connecticut', location: 'Storrs, CT', type: 'Public', acceptanceRate: 48.8, tuition: 41000, enrollment: 27000 },
    { name: 'University of Delaware', location: 'Newark, DE', type: 'Public', acceptanceRate: 66.4, tuition: 36000, enrollment: 24000 },
    { name: 'University of Massachusetts Amherst', location: 'Amherst, MA', type: 'Public', acceptanceRate: 63.8, tuition: 37000, enrollment: 32000 },
    { name: 'University of New Hampshire', location: 'Durham, NH', type: 'Public', acceptanceRate: 84.2, tuition: 36000, enrollment: 15000 },
    { name: 'University of Rhode Island', location: 'Kingston, RI', type: 'Public', acceptanceRate: 75.5, tuition: 34000, enrollment: 18000 },
    { name: 'University of Vermont', location: 'Burlington, VT', type: 'Public', acceptanceRate: 67.3, tuition: 43000, enrollment: 13000 },
    { name: 'University of Maine', location: 'Orono, ME', type: 'Public', acceptanceRate: 90.8, tuition: 32000, enrollment: 12000 },
    { name: 'University of New Mexico', location: 'Albuquerque, NM', type: 'Public', acceptanceRate: 96.7, tuition: 25000, enrollment: 26000 }
];
// Essay prompts for major colleges
const essayPrompts = {
    'Harvard University': [
        { title: 'Intellectual Experience', prompt: 'Briefly describe an intellectual experience that was important to you.', wordLimit: 200, required: true, category: 'Supplemental', tips: ['Be specific about the experience', 'Show intellectual curiosity', 'Connect to your academic interests'] },
        { title: 'Personal Growth', prompt: 'How have you grown over the past four years?', wordLimit: 200, required: true, category: 'Supplemental', tips: ['Show growth', 'Be honest', 'Reflect on challenges'] }
    ],
    'Stanford University': [
        { title: 'What matters to you, and why?', prompt: 'What matters to you, and why?', wordLimit: 250, required: true, category: 'Supplemental', tips: ['Be authentic', 'Show your values', 'Connect to your experiences'] },
        { title: 'Extracurricular Activity', prompt: 'Briefly describe one of your extracurricular activities or work experiences.', wordLimit: 150, required: true, category: 'Supplemental', tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role'] }
    ],
    'Yale University': [
        { title: 'Why Yale?', prompt: 'What is it about Yale that has led you to apply?', wordLimit: 125, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'] }
    ],
    'Princeton University': [
        { title: 'Extracurricular Activity', prompt: 'Briefly describe an extracurricular activity or work experience.', wordLimit: 150, required: true, category: 'Supplemental', tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role'] }
    ],
    'Columbia University': [
        { title: 'Why Columbia?', prompt: 'Why are you interested in attending Columbia University?', wordLimit: 200, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'] }
    ],
    'University of Pennsylvania': [
        { title: 'Why Penn?', prompt: 'How will you explore your intellectual and academic interests at the University of Pennsylvania?', wordLimit: 300, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'] }
    ],
    'Brown University': [
        { title: 'Why Brown?', prompt: 'Why are you drawn to the area(s) of study you indicated earlier in this application?', wordLimit: 250, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'] }
    ],
    'Dartmouth College': [
        { title: 'Why Dartmouth?', prompt: 'Why Dartmouth?', wordLimit: 100, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'] }
    ],
    'Cornell University': [
        { title: 'Why Cornell?', prompt: 'Why are you drawn to studying the major you have selected?', wordLimit: 650, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'] }
    ],
    'Massachusetts Institute of Technology': [
        { title: 'Why MIT?', prompt: 'Why are you interested in attending MIT?', wordLimit: 250, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'] }
    ],
    'University of California, Berkeley': [
        { title: 'Personal Insight Questions', prompt: 'Describe an example of your leadership experience in which you have positively influenced others, helped resolve disputes, or contributed to group efforts over time.', wordLimit: 350, required: true, category: 'Supplemental', tips: ['Show leadership', 'Focus on positive impact', 'Be specific about your role'] },
        { title: 'Personal Insight Questions', prompt: 'Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.', wordLimit: 350, required: true, category: 'Supplemental', tips: ['Show creativity', 'Be specific', 'Connect to your interests'] }
    ],
    'University of California, Los Angeles': [
        { title: 'Personal Insight Questions', prompt: 'Describe an example of your leadership experience in which you have positively influenced others, helped resolve disputes, or contributed to group efforts over time.', wordLimit: 350, required: true, category: 'Supplemental', tips: ['Show leadership', 'Focus on positive impact', 'Be specific about your role'] },
        { title: 'Personal Insight Questions', prompt: 'Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.', wordLimit: 350, required: true, category: 'Supplemental', tips: ['Show creativity', 'Be specific', 'Connect to your interests'] }
    ],
    'University of Michigan': [
        { title: 'Why Michigan?', prompt: 'Describe the unique qualities that attract you to the specific undergraduate College or School (including preferred admission and dual degree programs) to which you are applying at the University of Michigan. How would that curriculum support your interests?', wordLimit: 550, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'] },
        { title: 'Community Essay', prompt: 'Everyone belongs to many different communities and/or groups defined by (among other things) shared geography, religion, ethnicity, income, cuisine, interest, race, ideology, or intellectual heritage. Choose one of the communities to which you belong, and describe that community and your place within it.', wordLimit: 300, required: true, category: 'Supplemental', tips: ['Be specific about your community', 'Show your role and impact', 'Demonstrate belonging'] }
    ],
    'University of Virginia': [
        { title: 'Why UVA?', prompt: 'What about your individual background, perspective, or experience will serve as a source of strength for you or those around you at UVA?', wordLimit: 250, required: true, category: 'Why This School', tips: ['Show your unique perspective', 'Connect to UVA community', 'Demonstrate self-awareness'] }
    ],
    'University of North Carolina at Chapel Hill': [
        { title: 'Why UNC?', prompt: 'What do you hope will change about the place where you live?', wordLimit: 250, required: true, category: 'Supplemental', tips: ['Show civic engagement', 'Demonstrate problem-solving', 'Connect to your community'] }
    ],
    'University of Texas at Austin': [
        { title: 'Why UT Austin?', prompt: 'Why are you interested in the major you indicated as your first-choice major?', wordLimit: 500, required: true, category: 'Why This School', tips: ['Research the specific major', 'Show genuine interest', 'Connect to your background'] }
    ]
};
// Common App Essay Prompts
const commonAppPrompts = [
    { title: 'Background, Identity, Interest, or Talent', prompt: 'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.', wordLimit: 650, required: false, category: 'Common App', tips: ['Be authentic', 'Show growth and reflection', 'Connect to your future goals'] },
    { title: 'Challenge, Setback, or Failure', prompt: 'The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?', wordLimit: 650, required: false, category: 'Common App', tips: ['Show resilience', 'Focus on learning and growth', 'Be honest about challenges'] },
    { title: 'Questioned or Challenged a Belief', prompt: 'Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?', wordLimit: 650, required: false, category: 'Common App', tips: ['Show critical thinking', 'Be respectful', 'Focus on the process, not just the outcome'] },
    { title: 'Gratitude', prompt: 'Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?', wordLimit: 650, required: false, category: 'Common App', tips: ['Show gratitude', 'Focus on impact', 'Connect to your character'] },
    { title: 'Personal Growth', prompt: 'Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.', wordLimit: 650, required: false, category: 'Common App', tips: ['Show personal growth', 'Be specific about the event', 'Reflect on the impact'] },
    { title: 'Engaging Topic', prompt: 'Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?', wordLimit: 650, required: false, category: 'Common App', tips: ['Show passion', 'Be specific', 'Show how you pursue knowledge'] },
    { title: 'Free Topic', prompt: 'Share an essay on any topic of your choice. It can be one you\'ve already written, one that responds to a different prompt, or one of your own design.', wordLimit: 650, required: false, category: 'Common App', tips: ['Choose a topic you\'re passionate about', 'Make it personal', 'Show your unique perspective'] }
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Starting comprehensive database seeding...');
        // Create a test user if it doesn't exist
        const testUser = yield prisma.user.upsert({
            where: { email: 'test@example.com' },
            update: {},
            create: {
                email: 'test@example.com',
                name: 'Test User',
                graduationYear: 2025,
                highSchoolName: 'Test High School',
                intendedMajor: 'Computer Science',
            },
        });
        console.log('Test user created/updated:', testUser.email);
        // Seed Common App prompts (these are not tied to specific colleges)
        console.log('Seeding Common App essay prompts...');
        for (const prompt of commonAppPrompts) {
            yield prisma.essayPrompt.upsert({
                where: {
                    id: `common-${prompt.title.toLowerCase().replace(/\s+/g, '-')}`
                },
                update: {},
                create: {
                    id: `common-${prompt.title.toLowerCase().replace(/\s+/g, '-')}`,
                    title: prompt.title,
                    prompt: prompt.prompt,
                    wordLimit: prompt.wordLimit,
                    required: prompt.required,
                    category: prompt.category,
                    tips: JSON.stringify(prompt.tips),
                    year: '2024-2025',
                    collegeId: null // Common App prompts are not tied to specific colleges
                },
            });
        }
        // Seed colleges and their essay prompts
        console.log('Seeding colleges and essay prompts...');
        for (const collegeData of colleges) {
            // Create or update the college
            const college = yield prisma.college.upsert({
                where: {
                    id: `college-${collegeData.name.toLowerCase().replace(/\s+/g, '-')}`
                },
                update: {},
                create: {
                    id: `college-${collegeData.name.toLowerCase().replace(/\s+/g, '-')}`,
                    name: collegeData.name,
                    userId: testUser.id, // Associate with test user for now
                    status: 'In Progress',
                    location: collegeData.location,
                    type: collegeData.type,
                    acceptanceRate: collegeData.acceptanceRate,
                    tuition: collegeData.tuition,
                    enrollment: collegeData.enrollment,
                    priority: 1
                },
            });
            // Add essay prompts for this college if they exist
            const collegePrompts = essayPrompts[collegeData.name];
            if (collegePrompts) {
                for (const prompt of collegePrompts) {
                    yield prisma.essayPrompt.upsert({
                        where: {
                            id: `${college.id}-${prompt.title.toLowerCase().replace(/\s+/g, '-')}`
                        },
                        update: {},
                        create: {
                            id: `${college.id}-${prompt.title.toLowerCase().replace(/\s+/g, '-')}`,
                            title: prompt.title,
                            prompt: prompt.prompt,
                            wordLimit: prompt.wordLimit,
                            required: prompt.required,
                            category: prompt.category,
                            tips: JSON.stringify(prompt.tips),
                            year: '2024-2025',
                            collegeId: college.id
                        },
                    });
                }
            }
        }
        // Add some sample colleges for the test user
        const sampleColleges = [
            { name: 'Stanford University', status: 'In Progress', priority: 1 },
            { name: 'University of California, Berkeley', status: 'Applied', priority: 2 },
            { name: 'Massachusetts Institute of Technology', status: 'In Progress', priority: 3 },
        ];
        for (const collegeData of sampleColleges) {
            const collegeInfo = colleges.find(c => c.name === collegeData.name);
            if (collegeInfo) {
                yield prisma.college.upsert({
                    where: {
                        userId_name: {
                            userId: testUser.id,
                            name: collegeData.name,
                        },
                    },
                    update: {},
                    create: {
                        userId: testUser.id,
                        name: collegeData.name,
                        status: collegeData.status,
                        priority: collegeData.priority,
                        location: collegeInfo.location,
                        type: collegeInfo.type,
                        acceptanceRate: collegeInfo.acceptanceRate,
                        tuition: collegeInfo.tuition,
                        enrollment: collegeInfo.enrollment,
                    },
                });
            }
        }
        console.log('Sample colleges added for test user');
        console.log('Comprehensive seeding completed successfully!');
        console.log(`Seeded ${colleges.length} colleges with essay prompts`);
        console.log(`Seeded ${commonAppPrompts.length} Common App prompts`);
    });
}
main()
    .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
