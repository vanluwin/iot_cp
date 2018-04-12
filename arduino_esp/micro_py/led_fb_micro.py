"""
import ufirebase

fb = ufirebase.uFirebase('https://micro-py.firebaseio.com')

# Path no db
path = '/'

# Dado a ser inserido
data = {'led': 'Hello from esp'}

fb.put(path, data)
"""
from machine import Pin
from time import sleep

led = Pin(2, Pin.OUT)
led.value(1) 
#led.value(0)