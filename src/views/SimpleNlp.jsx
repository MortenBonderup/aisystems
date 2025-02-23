import { useState } from 'react';

export default function SimpleNLP() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState("No result, yet");

    const handleSubmit = (event) => {
        event.preventDefault();
        const likelihood = analyzeSymptoms(input);
        setResult(`Based on your description, you exhibit ${likelihood}% of the symptoms associated with having the flu.`);
    };

    const analyzeSymptoms = (input) => {

        // --------- Knowledge base -----------
        const symptoms = ['fever', 'cough', 'tired', 'body aches', 'chills', 'sore throat', 'fatique', 'headache'];
        let matchCount = 0;

        // --------- Inference engine ---------
        // For each symptem, check if it exists in the input from the user.
        // If it does, increase count with one 
        symptoms.forEach(symptom => {
            if (input.toLowerCase().includes(symptom)) {
                matchCount++;
            }
        });

        // Calculate how many symptoms are met, in percentage. 
        // Symptoms.length = the number of symptoms defined
        const likelihood = (matchCount / symptoms.length) * 100;
        return likelihood.toFixed(2); // Keep the result as a percentage with 2 decimal places
    };

    // ---------- User interface (UI) -----------
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <h1>Flu Likelihood Expert System</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="symptoms" style={{display: "block"}}>How do you feel?</label>
                <textarea style={{display: "block", width: "250px", height: "250px"}}
                    id="symptoms"
                    name="symptoms"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Describe your symptoms here..."
                ></textarea>
                <button type="submit" style={{display: "block"}}>Analyze</button>
            </form>
             <p>{result}</p>
        </div>
    );
};


