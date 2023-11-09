# -*- coding: utf-8 -*-
"""Untitled0.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1Pt5N7wOW-7MMI1TF6lC39Qkf_xG5LGcW
"""

from google.colab import drive
drive.mount('/content/gdrive')

import json
import pandas as pd


# Tentukan path file (jika berada di direktori yang sama dengan notebook, gunakan nama file saja)
file_path = '/content/gdrive/MyDrive/chatbot/intents.json'

with open(file_path) as data_file:
    data = json.load(data_file)

text_input = []
intents = []

for intent in data['intents']:
    for pattern in intent['patterns']:
        text_input.append(pattern)
        intents.append(intent['tag'])

df = pd.DataFrame({'text_input': text_input,
                    'intents': intents})

df.head()

df.intents.value_counts()



# label encoding
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical

le = LabelEncoder()
y_train = le.fit_transform(df.intents)
y_train = to_categorical(y_train)
all_vocab = []
length = []

for idx, row in df.iterrows():
    sent = row['text_input']
    [all_vocab.append(i) for i in sent.split()]
    length.append(len(sent.split()))

len(all_vocab)

max(length)

len(set(all_vocab))

from tensorflow.keras.layers import TextVectorization

max_vocab_length = 86
max_length = 6

text_vectorization = TextVectorization(max_tokens=max_vocab_length,
                                       standardize='lower_and_strip_punctuation',
                                       split='whitespace',
                                       ngrams=None,
                                       output_mode='int',
                                       output_sequence_length=max_length
                                       )

text_vectorization.adapt(df.text_input)
text_vectorization.get_vocabulary()

text_vectorization('halo nama kamu siapa')

text_vectorization.get_vocabulary()[0]

from tensorflow.keras.layers import Embedding
embedding = Embedding(input_dim=max_vocab_length,
                      output_dim=16,
                      embeddings_initializer="uniform",
                      input_length=max_length)

import numpy as np
res_embed = embedding(np.array([[71, 17,  7, 13,  0,  0]]))
res_embed

from tensorflow.keras import Model
from tensorflow.keras.layers import Input, Dense, LSTM
inputs = Input(shape=(1,), dtype='string')
x = text_vectorization(inputs)
x = embedding(x)
x = LSTM(12)(x)
outputs = Dense(9, activation='softmax')(x)
model_lstm = Model(inputs, outputs, name="LSTM_model")

# compile model
model_lstm.compile(loss='categorical_crossentropy',
                   optimizer='adam',
                   metrics=["accuracy"])
model_lstm.fit(df.text_input,
               y_train,
               epochs=200,
               verbose=0)



model_lstm.evaluate(df.text_input, y_train)



model_lstm.save("bot_model.tf")

import pickle
le_filename = open("label_encoder.pickle", "wb")
pickle.dump(le, le_filename)
le_filename.close()

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, SimpleRNN, Dense

# Membangun model RNN
model = Sequential([
    Embedding(input_dim=max_vocab_length, output_dim=8, input_length=max_length),
    SimpleRNN(units=16),
    Dense(units=len(set(df.intents)), activation='softmax')  # Jumlah unit sesuai dengan jumlah kategori intents
])

# Kompilasi model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Latih model
model.fit(text_vectorization(df.text_input), y_train, epochs=10)

# Contoh untuk model RNN
predicted_intent_rnn = model.predict(text_vectorization(["Pertanyaan Anda di sini"]))
predicted_label_rnn = le.inverse_transform(predicted_intent_rnn.argmax(axis=1))

# Contoh untuk model LSTM
predicted_intent_lstm = model_lstm.predict(["Pertanyaan Anda di sini"])
predicted_label_lstm = le.inverse_transform(predicted_intent_lstm.argmax(axis=1))