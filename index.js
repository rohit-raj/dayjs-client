(function () {
    const dayjs = require('dayjs-ext');
    const timeZone = require('dayjs-ext/plugin/timezone');
    dayjs.extend(timeZone);

    let DateTimeHelper = function() {
            this.date = dayjs();
    };

    DateTimeHelper.prototype.getDate = function (_custom_date) {
        let dt = new DateTimeHelper();
        if(_custom_date){
            dt.date = dayjs(_custom_date);
        } else {
            dt.date = dayjs();
        }
        return dt;
    };

    /**
     *
     * @param _format supported : x, X, any format other than these
     * @returns {DateTimeHelper}
     */
    DateTimeHelper.prototype.formatTo = function (_format) {
        let dt = new DateTimeHelper();
        switch (_format) {
            case 'X' :  return dt.unixTimeStamp();

            case 'x' :  dt.date = this.date.unix();
                        return dt;

            default :   dt.date = this.date.format(_format).toString();
                        return dt;
        }
    };

    DateTimeHelper.prototype.unixTimeStamp = function() {
        let dt = new DateTimeHelper();
        dt.date = this.date.valueOf();
        return dt;
    };

    DateTimeHelper.prototype.tz = function(_timeZone) {
        let dt = new DateTimeHelper();
        dt.date = dayjs(this.date.format({timeZone : _timeZone}));
        return dt;
    };

    DateTimeHelper.prototype.endOf = function(_type) {
        let dt = new DateTimeHelper();

        switch (_type){
            case 'day'   :  dt.time = this.date.endOf('day');
                            return dt;
            case 'month' :  dt.time = this.date.endOf('month');
                            return dt;
            default      :  dt.time = this.date.endOf(_type);
                            return dt;
        }
    };

    DateTimeHelper.prototype.startOf = function(_type) {
        let dt = new DateTimeHelper();

        switch (_type){
            case 'day' :    dt.time = this.date.startOf('day');
                return dt;
            case 'month' :  dt.time = this.date.startOf('month');
                return dt;
            default : dt.time = this.date.startOf(_type);
                return dt;
        }
    };

    // exports.timeHelper = new DateTimeHelper();
    module.exports = new DateTimeHelper();

})();
