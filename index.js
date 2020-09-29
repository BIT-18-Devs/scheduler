var Schedule = (function () {
    function Schedule(calendar, noScheduleMessage) {
        if (noScheduleMessage === void 0) { noScheduleMessage = 'No Schedule'; }
        this.calendar = calendar;
        this.NO_SCHEDULE = noScheduleMessage;
    }
    Schedule.prototype.getDayNumber = function (date) {
        if (date === void 0) { date = new Date(); }
        return date.getDay();
    };
    Schedule.prototype.setNoScheduleMessage = function (message) {
        this.NO_SCHEDULE = message;
    };
    Schedule.prototype.getClassTable = function () {
        return this.calendar.map(function (value) { return value.classes; });
    };
    Schedule.prototype.getPeriodNumber = function (time) {
        /*
         * -3 : no classes today,
         * -2 : classes have ended,
         * -1 : classes are yet to start
         */
        if (time === void 0) { time = new Date(); }
        var dayNumber = this.getDayNumber(time);
        var result = -3;
        var currentTime = new Date(time.valueOf());
        if (this.calendar[dayNumber].classes.length === 0) {
            return -3;
        }
        var testTime = new Date(time.valueOf());
        var start = this.calendar[dayNumber].timeRange[0].start;
        var end = this.calendar[dayNumber].timeRange[this.calendar[dayNumber].timeRange.length - 1].end;
        testTime.setHours(start.hour, start.minute);
        if (currentTime.getTime() < testTime.getTime()) {
            return -1;
        }
        testTime.setHours(end.hour, end.minute);
        if (currentTime.getTime() > testTime.getTime()) {
            return -2;
        }
        this.calendar[dayNumber].timeRange.forEach(function (_a, index) {
            var start = _a.start, end = _a.end;
            var startTime = new Date(time.valueOf());
            startTime.setHours(start.hour, start.minute);
            var endTime = new Date(time.valueOf());
            endTime.setHours(end.hour, end.minute);
            if (startTime.getTime() <= currentTime.getTime() && currentTime.getTime() <= endTime.getTime()) {
                result = index;
            }
        });
        return result;
    };
    Schedule.prototype.getClasses = function (date) {
        var dayNumber;
        if (typeof date === 'number') {
            dayNumber = date;
        }
        else {
            dayNumber = this.getDayNumber(date);
        }
        return this.calendar[dayNumber].classes;
    };
    Schedule.prototype.getClass = function (period, day) {
        if (period === void 0) { period = this.getPeriodNumber(); }
        var dayNumber;
        if (typeof day === 'number') {
            dayNumber = day;
        }
        else {
            dayNumber = this.getDayNumber(day);
        }
        if (this.calendar[dayNumber].classes.length < period || period < 0) {
            return this.NO_SCHEDULE;
        }
        return this.calendar[dayNumber].classes[period];
    };
    Schedule.prototype.getCurrentClass = function () {
        return this.getClass();
    };
    Schedule.prototype.getNextClass = function () {
        return this.getClass(this.getPeriodNumber() + 1);
    };
    Schedule.prototype.getLaterClass = function () {
        return this.getClass(this.getPeriodNumber() + 2);
    };
    return Schedule;
})();
exports["default"] = Schedule;
