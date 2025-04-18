import serial
import requests

bluetooth = serial.Serial('/dev/cu.HC-05', 9600, timeout=1)
while True:
    data = bluetooth.readline().decode('utf-8').strip()
    if data:
        print(f"Sensor Data: {data}")
        requests.post("http://localhost:8080/data", json={"value": data})
