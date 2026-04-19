export const CATEGORY_ORDER = ["Sign It", "Read It", "Watch It"] as const;
export type Category = typeof CATEGORY_ORDER[number];
export type ExerciseType = "sign" | "watch" | "read-word" | "read-sentence";

export const signLanguages = [
    {
        name: "ASL",
        description: "American Sign Language",
        image: "/flags/us.svg",
        exercises: [
            { id: 1, exerciseType: "sign" as ExerciseType, category: "Sign It" as Category, title: "Basic Signs", word: ['at','dad','tre','do','cat','fish','fri','forest','house','doctor','nurse','tbilisi','kutaisi','beer','dog','hat','cup','sun','car','bed','bus','ant','bee','cow','hen','pig','fox','arm','eye','map'], level: "Beginner" },
            { id: 3, exerciseType: "sign" as ExerciseType, category: "Sign It" as Category, title: "Conversational ASL", word: ["Elaborate","Foundation","Perception","Resolution","Traditional","Behavior","Operation","Fantastic","Overload","Relationship","Definition","Celebration","Instruction","Demonstrate","Communicate","Cooperation","Environment","Performance","Recognition","Development","Opportunity","Information","Observation","Achievement","Improvement","Competition","Alternative","Description","Imagination","Inspiration"], level: "Advanced" },
            { id: 4, exerciseType: "read-word" as ExerciseType, category: "Read It" as Category, title: "Read the Signs", word: ['cat', 'dog', 'fish', 'bird', 'star', 'home', 'book', 'hand', 'tree', 'door', 'cake', 'farm', 'car', 'sun', 'hat', 'cup', 'fox', 'bee', 'ant', 'bat'], level: "Beginner" },
            { id: 5, exerciseType: "read-sentence" as ExerciseType, category: "Read It" as Category, title: "Read the Sentence", word: ['at home', 'big cat', 'red car', 'old dog', 'hot sun', 'bad fox', 'fat hen', 'new hat', 'odd cup', 'sad ant', 'cold farm', 'dark tree', 'good book', 'blue star', 'hard work', 'fast bird', 'lost dog', 'free cat', 'warm home', 'long road'], level: "Intermediate" },
            { id: 2, exerciseType: "watch" as ExerciseType, category: "Watch It" as Category, title: "Finger Spelling", word: ['','Homework','Refrigerator'], level: "Intermediate" },
        ],
    },
    {
        name: "BSL",
        description: "British Sign Language",
        image: "/flags/uk.svg",
        exercises: [
            { id: 4, exerciseType: "sign" as ExerciseType, category: "Sign It" as Category, title: "Basic Signs", word: ['Apple', 'Homework', 'Refrigerator'], level: "Beginner" },
            { id: 6, exerciseType: "sign" as ExerciseType, category: "Sign It" as Category, title: "Conversational BSL", word: ['Apple', 'Homework', 'Refrigerator'], level: "Advanced" },
            { id: 5, exerciseType: "watch" as ExerciseType, category: "Watch It" as Category, title: "Finger Spelling", word: ['Apple', 'Homework', 'Refrigerator'], level: "Intermediate" },
        ],
    },
    {
        name: "FSL",
        description: "French Sign Language",
        image: "/flags/france.svg",
        exercises: [
            { id: 7, category: "Sign It" as Category, title: "Basic Signs", word: ['Apple', 'Homework', 'Refrigerator'], level: "Beginner" },
            { id: 9, exerciseType: "sign" as ExerciseType, category: "Sign It" as Category, title: "Conversational FSL", word: ['Apple', 'Homework', 'Refrigerator'], level: "Advanced" },
            { id: 8, exerciseType: "watch" as ExerciseType, category: "Watch It" as Category, title: "Finger Spelling", word: ['Apple', 'Homework', 'Refrigerator'], level: "Intermediate" },
        ],
    },
    {
        name: "ISL",
        description: "Indian Sign Language",
        image: "/flags/india.svg",
        exercises: [
            { id: 10, category: "Sign It" as Category, title: "Basic Signs", word: ['सिलेंडर'], level: "Beginner" },
            { id: 12, exerciseType: "sign" as ExerciseType, category: "Sign It" as Category, title: "Conversational ISL", word: ['फ्रीज'], level: "Advanced" },
            { id: 11, exerciseType: "watch" as ExerciseType, category: "Watch It" as Category, title: "Finger Spelling", word: ['गृहकार्य'], level: "Intermediate" },
        ],
    },
    {
        name: "CSL",
        description: "Chinese Sign Language",
        image: "/flags/china.svg",
        exercises: [
            { id: 13, category: "Sign It" as Category, title: "Basic Signs", word: ['苹果'], level: "Beginner" },
            { id: 15, exerciseType: "sign" as ExerciseType, category: "Sign It" as Category, title: "Conversational CSL", word: ['冰箱'], level: "Advanced" },
            { id: 14, exerciseType: "watch" as ExerciseType, category: "Watch It" as Category, title: "Finger Spelling", word: ['家庭作业'], level: "Intermediate" },
        ],
    },
    {
        name: "JSL",
        description: "Japanese Sign Language",
        image: "/flags/japan.svg",
        exercises: [
            { id: 19, category: "Sign It" as Category, title: "Basic Signs", word: ['リンゴ'], level: "Beginner" },
            { id: 21, exerciseType: "sign" as ExerciseType, category: "Sign It" as Category, title: "Conversational JSL", word: ['冷蔵庫'], level: "Advanced" },
            { id: 20, exerciseType: "watch" as ExerciseType, category: "Watch It" as Category, title: "Finger Spelling", word: ['宿題'], level: "Intermediate" },
        ],
    },
    {
        name: "SSL",
        description: "Spanish Sign Language",
        image: "/flags/spain.svg",
        exercises: [
            { id: 22, category: "Sign It" as Category, title: "Basic Signs", word: ['Manzana'], level: "Beginner" },
            { id: 24, exerciseType: "sign" as ExerciseType, category: "Sign It" as Category, title: "Conversational SSL", word: ['Refrigerador'], level: "Advanced" },
            { id: 23, exerciseType: "watch" as ExerciseType, category: "Watch It" as Category, title: "Finger Spelling", word: ['Tareas'], level: "Intermediate" },
        ],
    },
    {
        name: "GSL",
        description: "German Sign Language",
        image: "/flags/georgia.svg",
        exercises: [
            { id: 25, category: "Sign It" as Category, title: "Basic Signs", word: ['Apfel'], level: "Beginner" },
            { id: 27, exerciseType: "sign" as ExerciseType, category: "Sign It" as Category, title: "Conversational GSL", word: ['Kühlschrank'], level: "Advanced" },
            { id: 26, exerciseType: "watch" as ExerciseType, category: "Watch It" as Category, title: "Finger Spelling", word: ['Hausaufgaben'], level: "Intermediate" },
        ],
    },
    {
        name: "MSL",
        description: "Mexican Sign Language",
        image: "/flags/mexico.svg",
        exercises: [
            { id: 28, category: "Sign It" as Category, title: "Basic Signs", word: ['Manzana'], level: "Beginner" },
            { id: 30, exerciseType: "sign" as ExerciseType, category: "Sign It" as Category, title: "Conversational MSL", word: ['Refrigerador'], level: "Advanced" },
            { id: 29, exerciseType: "watch" as ExerciseType, category: "Watch It" as Category, title: "Finger Spelling", word: ['Tareas'], level: "Intermediate" },
        ],
    },
];
