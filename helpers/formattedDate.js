function formattedDate(next) {
    const newDate = new Date(this.date);
    this.year = newDate.getFullYear();
    this.month = newDate.getMonth() + 1;
    next();
}

module.exports = formattedDate;
