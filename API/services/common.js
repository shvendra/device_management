function getEuropeBerlinCurrentTime(timezone, returnInMiliseconds) {
    if (typeof timezone === 'undefined') {
        timezone = 'Europe/Berlin';
    }
    if (typeof returnInMiliseconds === 'undefined') {
        returnInMiliseconds = false;
    }
    let options = {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const dateTimeFormat = new Intl.DateTimeFormat('en', options)
    const [{ value: month }, , { value: day }, , { value: year }, , { value: hour }, , { value: minute }, , { value: second }] = dateTimeFormat.formatToParts(new Date())
    if (returnInMiliseconds) {
        var currentTime = Date.parse(new Date(`${year }-${month}-${day}T${hour}:${minute}:${second}Z`).toUTCString())
    } else {
        var currentTime = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
        //var currentTime = `${year }-${month}-${day}T${hour}:${minute}:${second}Z`;
    }
    return currentTime;
}