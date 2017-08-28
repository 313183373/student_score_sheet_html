let studentList = [];

class Student {
    constructor(name, id, nation, klass, chinese, math, english, program) {
        this.name = name;
        this.id = id;
        this.nation = nation;
        this.klass = klass;
        this.chinese = chinese;
        this.math = math;
        this.english = english;
        this.program = program;
        this.total = this.chinese + this.math + this.english + this.program;
        this.average = (this.total / 4).toFixed(2);
    }
}

function check_same_id(id) {
    return studentList.some(value => {
        return value.id === id;
    });
}

function check_same_id_update(id) {
    return studentList.some(value => {
        if(value.id===student_need_update.id){
            return false;
        }
        return value.id === id;
    });
}

function check_id(id) {
    return (/^\d{4}$/.test(id));
}

function check_ids(id_arr) {
    return id_arr.every((value) => {
        return (/^\d{4}$/.test(value));
    });
}

function addList(name, id, nation, klass, chinese, math, english, program) {
    studentList.push(new Student(name, id, nation, klass, chinese, math, english, program));
    localStorage.list = JSON.stringify(studentList);
}


function clear_sheet(ids = "") {
    let rows = $('#score-sheet tr');
    if (ids === "") {
        for (let i = 2; i < rows.length; i++) {
            rows[i].remove();
        }
    } else {
        for (let i = 2; i < rows.length; i++) {
            if (ids.includes($(rows[i]).text().substr(0, 4)) || i === rows.length - 1) {
                rows[i].remove();
            }
        }
        rows = $('#score-sheet tr');
        if (rows.length > 2) {
            let [sheet_list, average, middle] = read_sheet(rows);
            $('#score-sheet').append(`<tr><td colspan="5">总分平均分:${average}</td><td colspan="5">总分中位数:${middle}</td></tr>`)
        }
    }
}

function read_sheet(rows) {
    if (rows.length > 2) {
        let cnt = 0;
        let total = 0, middle;
        let temp_arr = [];
        for (let i = 2; i < rows.length; i++) {
            cnt++;
            let student_info = $(rows[i]).html().split('<td>').join('').split('</td>');
            let name = student_info[1];
            let id = student_info[0];
            let klass = student_info[2];
            let nat = student_info[3];
            let chinese = parseInt(student_info[4]);
            let math = parseInt(student_info[5]);
            let english = parseInt(student_info[6]);
            let program = parseInt(student_info[7]);
            total += chinese + math + english + program;
            temp_arr.push(new Student(name, id, nat, klass, chinese, math, english, program));
        }
        temp_arr.sort((a, b) => a.total - b.total);
        if (temp_arr.length & 1) {
            middle = temp_arr[Math.floor(temp_arr.length / 2)].total;
        } else {
            middle = (temp_arr[temp_arr.length / 2].total + temp_arr[temp_arr.length / 2 - 1].total) / 2;
        }
        let average = (total / cnt).toFixed(2);
        middle = middle.toFixed(2);
        return [temp_arr, average, middle];
    }
}