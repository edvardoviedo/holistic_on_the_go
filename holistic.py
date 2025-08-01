from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
import os
from datetime import datetime
import random

holistic_bp = Blueprint('holistic', __name__)

def get_zodiac_sign(birthdate):
    """Obtener el signo zodiacal basado en la fecha de nacimiento"""
    month = birthdate.month
    day = birthdate.day
    
    if (month == 3 and day >= 21) or (month == 4 and day <= 19):
        return "Aries"
    elif (month == 4 and day >= 20) or (month == 5 and day <= 20):
        return "Tauro"
    elif (month == 5 and day >= 21) or (month == 6 and day <= 20):
        return "Géminis"
    elif (month == 6 and day >= 21) or (month == 7 and day <= 22):
        return "Cáncer"
    elif (month == 7 and day >= 23) or (month == 8 and day <= 22):
        return "Leo"
    elif (month == 8 and day >= 23) or (month == 9 and day <= 22):
        return "Virgo"
    elif (month == 9 and day >= 23) or (month == 10 and day <= 22):
        return "Libra"
    elif (month == 10 and day >= 23) or (month == 11 and day <= 21):
        return "Escorpio"
    elif (month == 11 and day >= 22) or (month == 12 and day <= 21):
        return "Sagitario"
    elif (month == 12 and day >= 22) or (month == 1 and day <= 19):
        return "Capricornio"
    elif (month == 1 and day >= 20) or (month == 2 and day <= 18):
        return "Acuario"
    else:
        return "Piscis"

def get_mystical_songs():
    """Lista de canciones místicas y relajantes"""
    songs = [
        {"title": "Breathe", "artist": "Telepopmusik", "reason": "su ritmo se alinea con tu chakra corona"},
        {"title": "Weightless", "artist": "Marconi Union", "reason": "científicamente diseñada para reducir la ansiedad"},
        {"title": "Aqueous Transmission", "artist": "Incubus", "reason": "conecta con las energías acuáticas del universo"},
        {"title": "Svefn-g-englar", "artist": "Sigur Rós", "reason": "eleva tu vibración a frecuencias angelicales"},
        {"title": "Porcelain", "artist": "Moby", "reason": "purifica tu aura como cristal de cuarzo"},
        {"title": "Teardrop", "artist": "Massive Attack", "reason": "sincroniza con los latidos de tu corazón"},
        {"title": "Kiara", "artist": "Bonobo", "reason": "despierta tu energía kundalini"},
        {"title": "Midnight City", "artist": "M83", "reason": "conecta con la magia nocturna del cosmos"},
        {"title": "Holocene", "artist": "Bon Iver", "reason": "te conecta con los ciclos naturales de la Tierra"},
        {"title": "Intro", "artist": "The xx", "reason": "crea un espacio sagrado en tu mente"}
    ]
    return random.choice(songs)

def get_magical_tips():
    """Lista de tips mágicos"""
    tips = [
        "Coloca tu mano en tu corazón y susurra 'Yo me expando' tres veces antes de comenzar cualquier cosa",
        "Visualiza una luz dorada rodeando tu cuerpo durante 30 segundos",
        "Respira profundamente 4 veces, imaginando que inhalas estrellas y exhalas nubes",
        "Escribe una palabra de gratitud en tu palma izquierda con el dedo índice derecho",
        "Mira hacia el cielo y envía un pensamiento de amor al universo",
        "Toca algo de la naturaleza (una planta, una piedra) y siente su energía",
        "Cierra los ojos y repite mentalmente 'Soy paz, soy amor, soy luz'",
        "Imagina raíces creciendo desde tus pies hacia el centro de la Tierra",
        "Dibuja un círculo invisible alrededor de ti con intención protectora",
        "Susurra un deseo al viento y confía en que el universo lo escucha"
    ]
    return random.choice(tips)

@holistic_bp.route('/generate-guidance', methods=['POST'])
@cross_origin()
def generate_guidance():
    try:
        data = request.json
        
        # Extraer datos del formulario
        nickname = data.get('nickname', 'Alma hermosa')
        birthdate_str = data.get('birthdate')
        birthplace = data.get('birthplace', 'un lugar mágico')
        favorite_color = data.get('favoriteColor', '#8B5CF6')
        daily_goal = data.get('dailyGoal', 'encontrar paz')
        checkpoints = data.get('checkpoints', [])
        language = data.get('language', 'en')
        
        # Procesar fecha de nacimiento
        birthdate = datetime.strptime(birthdate_str, '%Y-%m-%d')
        zodiac_sign = get_zodiac_sign(birthdate)
        
        # Obtener canción y tip mágico
        song = get_mystical_songs()
        magical_tip = get_magical_tips()
        
        # Crear prompt para OpenAI
        if language == 'es':
            prompt = f"""
            Eres un coach holístico místico y sabio. Crea una guía personalizada para {nickname}, nacido/a bajo el signo de {zodiac_sign} en {birthplace}, 
            cuyo color favorito es {favorite_color} y cuyo objetivo diario es {daily_goal}.
            
            Incluye:
            1. Un mensaje calmante y empoderador basado en su signo zodiacal
            2. Una recomendación de comida específica y por qué (basada en su estado de ánimo, color o tipo de energía)
            3. Una recomendación de atuendo para conectar con la vibra del día
            
            Mantén un tono místico, cálido y personal. Usa máximo 150 palabras.
            """
        else:
            prompt = f"""
            You are a mystical and wise holistic coach. Create a personalized guide for {nickname}, born under the sign of {zodiac_sign} in {birthplace}, 
            whose favorite color is {favorite_color} and whose daily goal is {daily_goal}.
            
            Include:
            1. A calming and empowering message based on their zodiac sign
            2. A specific food recommendation and why (based on their mood, color, or energy type)
            3. An outfit recommendation to connect with the day's vibe
            
            Keep a mystical, warm, and personal tone. Use maximum 150 words.
            """
        
        # Llamar a OpenAI
        from openai import OpenAI
        client = OpenAI()
        
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": "You are a mystical holistic coach who provides personalized spiritual guidance."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200,
            temperature=0.8
        )
        
        ai_message = response.choices[0].message.content.strip()
        
        # Preparar respuesta
        guidance = {
            "message": ai_message,
            "song": song,
            "magicalTip": magical_tip,
            "zodiacSign": zodiac_sign
        }
        
        return jsonify(guidance), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

