const gpu = require('node-nvidia-smi');
const tg = require('node-telegram-bot-api');
const settings = require('./settings.json');
const bot = new tg(settings.token, { polling: true });
var id;
var timer;
bot.on('message', function(msg) {

    if(msg.from.username == settings.user)
    {
        bot.sendMessage(msg.chat.id, 'I will report GPU status every ' + settings.interval + " minutes.\nTo change interval, edit settings.json");
        id = msg.chat.id;
        if(msg.text == "/start")
            sendData();
        else if(msg.text == "/stop")
            stop();
    }
    else
    {
	    bot.sendMessage(msg.chat.id, 'Sorry, you are not available to get stats of GPU :|');
    }

});
bot.on('polling_error', (err) => {
    console.log(err);
});
function sendData()
{
    gpu(function(err, data){
        if(err)
        {
            bot.sendMessage(id, err);
        }
        else
        {
            data = data.nvidia_smi_log.gpu;
            var temperature = parseInt(data.temperature.gpu_temp);
            var max_temp = data.temperature.gpu_temp_max_threshold;
            var speed = data.fan_speed;
            var memory = parseInt(data.fb_memory_usage.used) + "/" + parseInt(data.fb_memory_usage.total) + " MB";
            if(temperature <= 75)
            {
                bot.sendMessage(id, "[" + data.product_name + "] Memory usage: " + memory + " Current temperature is " + temperature + "C . Fan speed: " + speed);
            }
            else
            {
                bot.sendMessage(id, "!!!POSSIBLE OVERHEAT!!! [" + data.product_name + "] Current temperature is " + temperature + "C . Fan speed: " + speed + " !!!WATCH OUT!!!");
            }
        }
    });
    return timer = setTimeout(sendData, 60000 * settings.interval);
}
function stop()
{
    clearTimeout(timer);
    bot.sendMessage(id, "You will no longer recieve message about gpu status. To start again, use '/start'");
}