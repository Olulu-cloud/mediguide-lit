from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
# This allows your frontend (localhost:5173) to talk to this backend (localhost:5001)
CORS(app) 

# --- EDUCATIONAL DATA: 50 SICKNESS MAPPINGS ---
# Format: "keyword": (["Possible Conditions"], "Educational Advice")
SYMPTOM_MAP = {
    "headache": (["Tension Headache", "Migraine", "Dehydration"], "Rest in a quiet room and stay hydrated."),
    "fever": (["Viral Infection", "Influenza", "Common Cold"], "Monitor temperature and drink plenty of fluids."),
    "cough": (["Bronchitis", "Common Cold", "Post-nasal Drip"], "Warm liquids can help soothe the throat."),
    "sneezing": (["Allergic Rhinitis", "Hay Fever"], "Avoid known allergens like dust or pollen."),
    "itchy eyes": (["Allergic Conjunctivitis"], "Use cool compresses and avoid rubbing eyes."),
    "stomach ache": (["Gastritis", "Indigestion", "Food Intolerance"], "Avoid heavy meals; try ginger tea."),
    "diarrhea": (["Gastroenteritis", "Dietary Indiscretion"], "Focus on electrolyte replacement and the BRAT diet."),
    "rash": (["Contact Dermatitis", "Eczema Flare-up"], "Avoid scratching; use mild, fragrance-free soap."),
    "sore throat": (["Pharyngitis", "Tonsillitis"], "Gargle with warm salt water."),
    "earache": (["Otitis Media", "Wax Buildup"], "Avoid putting cotton swabs inside the ear."),
    "back pain": (["Muscle Strain", "Sciatica"], "Gentle stretching and heat or ice packs may help."),
    "vomiting": (["Stomach Flu", "Food Poisoning"], "Take small, frequent sips of clear liquids."),
    "fatigue": (["Anemia", "Viral Prodrome", "Insomnia"], "Ensure adequate rest and a balanced diet."),
    "dizziness": (["Vertigo", "Low Blood Pressure", "Dehydration"], "Sit or lie down immediately to prevent falls."),
    "heartburn": (["Acid Reflux (GERD)", "Indigestion"], "Avoid lying down immediately after eating."),
    "constipation": (["Low Fiber Intake", "Dehydration"], "Increase fiber (fruits/veg) and water intake."),
    "runny nose": (["Common Cold", "Allergies"], "Use a saline spray to clear nasal passages."),
    "chest pain": (["Chest Muscle Strain", "Warning: Seek Emergency Care if severe"], "If pain is crushing or radiates, call emergency services."),
    "shortness of breath": (["Asthma Flare", "Anxiety"], "Try to remain calm; seek medical help if persistent."),
    "joint pain": (["Arthritis", "Minor Injury"], "Rest the joint and avoid strenuous activity."),
    "swollen glands": (["Infection Response", "Lymphadenitis"], "Usually a sign the body is fighting an infection."),
    "blurred vision": (["Eye Strain", "Refractive Error"], "Rest eyes from screens; consult an optometrist."),
    "nausea": (["Motion Sickness", "Mild Indigestion"], "Ginger or peppermint may settle the stomach."),
    "insomnia": (["Stress", "Poor Sleep Hygiene"], "Limit screen time 1 hour before bed."),
    "night sweats": (["Infection", "Hormonal Changes"], "Keep the bedroom cool and wear breathable fabric."),
    "dry skin": (["Xerosis", "Dehydration"], "Apply thick moisturizer after bathing."),
    "bruising": (["Minor Contusion"], "Apply ice to the area for 15 minutes."),
    "toothache": (["Dental Caries", "Gingivitis"], "Rinse with warm salt water and see a dentist."),
    "stiff neck": (["Cervical Strain", "Poor Posture"], "Check your desk ergonomics and move gently."),
    "mouth sores": (["Aphthous Ulcer (Canker Sore)"], "Avoid spicy or acidic foods."),
    "bad breath": (["Halitosis", "Poor Oral Hygiene"], "Brush twice daily and clean your tongue."),
    "hair loss": (["Telogen Effluvium", "Nutritional Deficiency"], "Consult a doctor for a basic blood test."),
    "brittle nails": (["Biotin Deficiency", "Frequent Washing"], "Moisturize nails and cuticles."),
    "acne": (["Acne Vulgaris"], "Wash skin gently twice a day; do not squeeze."),
    "sunburn": (["First-degree Burn"], "Apply aloe vera and drink extra water."),
    "insect bite": (["Local Allergic Reaction"], "Apply a cold pack or anti-itch cream."),
    "wheezing": (["Reactive Airway Disease", "Bronchitis"], "Seek evaluation if this is a new symptom."),
    "bloating": (["Excess Gas", "IBS"], "Eat smaller meals and avoid carbonated drinks."),
    "chills": (["Rigors due to Fever"], "Stay warm under blankets while monitoring fever."),
    "cramps": (["Muscle Spasm", "Menstrual Cramps"], "Heat packs and light movement often help."),
    "nosebleed": (["Nasal Dryness"], "Pinch the nose and lean forward for 10 minutes."),
    "hiccups": (["Diaphragm Irritation"], "Sip cold water or hold your breath briefly."),
    "itchy skin": (["Pruritus", "Urticaria"], "Use cool showers and fragrance-free lotions."),
    "sore tongue": (["Glossitis", "Minor Burn"], "Avoid very hot drinks or rough foods."),
    "watery eyes": (["Allergies", "Dry Eye Syndrome"], "Use artificial tears for comfort."),
    "hoarseness": (["Laryngitis", "Vocal Strain"], "Rest your voice; do not whisper."),
    "thirst": (["Dehydration", "High Blood Sugar Warning"], "Increase water intake; see a doctor if extreme."),
    "cold hands": (["Poor Circulation", "Raynaud's"], "Keep your hands and core warm."),
    "burning urination": (["Possible UTI", "Cystitis"], "Drink plenty of water; seek medical evaluation."),
    "anxiety": (["Stress Response", "General Anxiety"], "Try 4-7-8 deep breathing techniques.")
}

# --- ENDPOINTS ---

@app.route('/api/health/symptoms', methods=['POST'])
def check_symptoms():
    data = request.get_json()
    user_input = data.get('symptoms', '').lower()
    
    # Simulate a small delay for better UI experience
    time.sleep(1)

    found_conditions = []
    found_suggestions = []

    # Logic: Search the 50 keywords in the user's text
    for keyword, (conditions, advice) in SYMPTOM_MAP.items():
        if keyword in user_input:
            found_conditions.extend(conditions)
            found_suggestions.append(advice)

    # Handle case where no keywords match
    if not found_conditions:
        return jsonify({
            "conditions": ["General malaise"],
            "suggestions": "Monitor your symptoms, rest, and stay hydrated.",
            "disclaimer": "Educational only. Not a substitute for medical advice."
        })

    # Prepare response (remove duplicate conditions using set)
    response = {
        "conditions": list(set(found_conditions)),
        "suggestions": " ".join(found_suggestions),
        "disclaimer": "Educational information only. Consult a doctor for diagnosis."
    }
    return jsonify(response)

# Endpoint to get sample OTC products
@app.route('/api/products')
def get_products():
    products = [
        {"id": 1, "name": "Pain Relief Tablets", "description": "Acetaminophen 500mg, 100 count.", "price": 8.99, "imageUrl": "https://images.unsplash.com/photo-1616526628217-c21fd2eef624?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGFpbiUyMFJlbGllZiUyMFRhYmxldHMlMjBkZXNjcmlwdGlvbiUzQUFjZXRhbWlub3BoZW4lMjA1MDBtZyUyQyUyMDEwMCUyMGNvdW50fGVufDB8fDB8fHww"},
        {"id": 2, "name": "Cough Syrup", "description": "Relieves cough and cold symptoms.", "price": 12.50, "imageUrl": "https://images.unsplash.com/photo-1605434937024-dc368e73ed8b?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y291Z2glMjBzeXJ1cHxlbnwwfHwwfHx8MA%3D%3D"},
        {"id": 3, "name": "Immune Support Vitamin C", "description": "Effervescent tablets.", "price": 5.25, "imageUrl": "https://images.unsplash.com/photo-1767116291180-1838947b6c4d?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SW1tdW5lJTIwU3VwcG9ydCUyMFZpdGFtaW4lMjBDfGVufDB8fDB8fHww"},
        {"id": 4, "name": "Allergy Relief Pills", "description": "Loratadine 10mg, non-drowsy, 30 count.", "price": 15.99, "imageUrl": "https://images.unsplash.com/photo-1664956617097-a99150bc32bc?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWxsZXJneSUyMHJlbGllZiUyMHBpbGxzfGVufDB8fDB8fHww"},
        {"id": 5, "name": "Ibuprofen 200mg", "description": "NSAID pain reliever, 100 tablets.", "price": 6.50, "imageUrl": "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWJ1cHJvZmVuJTIwMjAwbWd8ZW58MHx8MHx8fDA%3D"},
        {"id": 6, "name": "First Aid Kit (Basic)", "description": "Bandages, antiseptic wipes, gauze.", "price": 19.99, "imageUrl": "https://images.unsplash.com/photo-1563260324-5ebeedc8af7c?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zmlyc3QlMjBhaWQlMjBraXR8ZW58MHx8MHx8fDA%3D"},
        {"id": 7, "name": "Antiseptic Wipes", "description": "Box of 50 individually wrapped wipes.", "price": 4.99, "imageUrl": "https://i.pinimg.com/736x/6e/84/d1/6e84d1657d4dd82c61050b582ed3b287.jpg"},
        {"id": 8, "name": "Hand Sanitizer (Gel)", "description": "Alcohol-based gel, 8oz bottle.", "price": 3.49, "imageUrl": "https://images.unsplash.com/photo-1608564348103-2b78891150cf?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFuZCUyMHNhbml0aXplciUyMGdlbHxlbnwwfHwwfHx8MA%3D%3D"},
        {"id": 9, "name": "Digital Thermometer", "description": "Fast and accurate temperature reading.", "price": 8.00, "imageUrl": "https://images.unsplash.com/photo-1609725236589-d987ffc8133a?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlnaXRhbCUyMHRoZXJtb21ldGVyfGVufDB8fDB8fHww"},
        {"id": 10, "name": "Band-Aids (Assorted)", "description": "Box of 60 waterproof bandages.", "price": 5.99, "imageUrl": "https://i.pinimg.com/1200x/45/00/8b/45008b759359a9e12088d9951ba11ba5.jpg"},
        {"id": 11, "name": "Hydrocortisone Cream", "description": "Anti-itch cream, 1oz tube.", "price": 4.50, "imageUrl": "https://i.pinimg.com/1200x/de/88/f4/de88f4d186602ba634e601748634c90c.jpg"},
        {"id": 12, "name": "Sleep Aid Melatonin", "description": "3mg tablets, 60 count.", "price": 7.25, "imageUrl": "https://i.pinimg.com/736x/47/34/52/473452158e0f9186b8fae2e1a5a0c423.jpg"},
        {"id": 13, "name": "Cough Drops (Honey Lemon)", "description": "Pack of 30 soothing drops.", "price": 2.99, "imageUrl": "https://i.pinimg.com/1200x/d5/98/67/d59867e14e97fd4ac6357059d35fee4e.jpg"},
        {"id": 14, "name": "Fiber Supplement Gummies", "description": "90 count, natural fruit flavors.", "price": 10.65, "imageUrl": "https://i.pinimg.com/1200x/15/da/46/15da466894ac8335588f5ed461ab12ce.jpg"},
        {"id": 15, "name": "B12 Vitamin Sublingual", "description": "2500mg, 60 tablets.", "price": 4.70, "imageUrl": "https://i.pinimg.com/736x/4e/75/80/4e7580cc52bf77ad157b979773b0d11f.jpg"},
        {"id": 16, "name": "Magnesium Oxide 400mg", "description": "Dietary supplement, 120 caplets.", "price": 3.49, "imageUrl": "https://i.pinimg.com/1200x/dd/2b/10/dd2b1088cd09a0f6d20aabf8b422757a.jpg"},
        {"id": 17, "name": "Aspirin EC 81mg", "description": "Enteric coated low dose aspirin, 120 count.", "price": 0.79, "imageUrl": "https://i.pinimg.com/736x/de/20/c7/de20c75800a3e8fb84e12f9126c71bca.jpg"},
        {"id": 18, "name": "Saline Nasal Spray", "description": "Natural relief for dry nasal passages, 44ml.", "price": 0.69, "imageUrl": "https://i.pinimg.com/1200x/88/62/73/8862733b3af6791a4ccb35cb314cf885.jpg"},
        {"id": 19, "name": "Cold Formula Caplets", "description": "Multi-symptom relief, 24 count.", "price": 1.85, "imageUrl": "https://i.pinimg.com/736x/4a/d9/16/4ad9168449051e4d87a16cc9e0712a17.jpg"},
        {"id": 20, "name": "Excedrin Pain Reliever", "description": "Acetaminophen, Aspirin, Caffeine tablets, 100 count.", "price": 2.49, "imageUrl": "https://i.pinimg.com/1200x/1f/21/56/1f2156e5d4444f206ffebcb29241e3cf.jpg"}
    ]
    return jsonify(products)

if __name__ == '__main__':
    # Run the app on port 5001 (or whatever port you selected previously)
    app.run(debug=True, port=5001)
