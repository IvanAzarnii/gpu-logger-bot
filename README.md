# gpu-logger-bot
This bot was created to log PC's GPU temperature, memory usage and fan speed and send this data to Telegram.

# How to install it?

1. Run ```git clone https://github.com/IvanAzarnii/gpu-logger-bot```

2. Add ```C:\Program Files\NVIDIA Corporation\NVSMI``` to your PATH. <br />

If you're a Linux user, nvidia-smi usually located in ```/usr/lib/nvidia-*/bin``` replace '*' with your driver version.

3. Install all dependecies by running 'npm install'.

4. Set up Token, interval of messages and your username in settings.json.

5. Run ```node app.js```
