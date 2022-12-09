function createEmpData(data) {
    const empData = { ...data._doc };

    const empType = empData.type === "income" ? "+" : "-";

    const newDate = new Date(empData.date);
    const year = String(newDate.getFullYear()).slice(-2);
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");

    const empDate = `${day}.${month}.${year}`;

    empData.type = empType;
    empData.date = empDate;
    return { ...empData, type: empType, date: empDate };
}

module.exports = createEmpData;
