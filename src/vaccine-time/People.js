import React, { useState } from 'react';
import vaccineSchedule from "./data/cdc-schedule.json";

function People() {
    const [users, setUsers] = useState([
    ]);

    const addUserToEnd = (newUser) => {
        setUsers(state => [...state, newUser])
    }

    function clearPeople() {
        setUsers([]);
    }

    function processVaccineRecords() {
        var importData = document.getElementById('importData');

        if (importData.value.trim() !== "") {
            clearPeople();
            var lines = importData.value.split('\n');
            
            var newPerson = null;
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i].trim();
                if (line === "") {
                    if (newPerson != null) {
                        addUserToEnd(newPerson);
                        findAppropriateSchedule(newPerson);
                        newPerson = null;
                    }
                } else {
                    if (newPerson == null) {
                        newPerson = {name: line, doses: [], immunocompromised: false};
                    } else {
                        if (line[0] >= '0' && line[0] <= '9') {
                            var ms = Date.parse(line);
                            var date = new Date(ms);
                            newPerson.birthDate = date;
                        } else if (line.toLowerCase() === "immunocompromised" || line.toLowerCase() === "ic") {
                            newPerson.immunocompromised = true;
                        } else {
                            var chunks = line.split(' ');
                            var dose = { "vaccine": chunks[0], "date": chunks[1] };
                            newPerson.doses.push(dose);
                        }
                    }
                }
            }

            if (newPerson != null) {
                addUserToEnd(newPerson);
                findAppropriateSchedule(newPerson);
                newPerson = null;
            }
        } else {
            clearPeople();
        }
    }

    function calculateAge(birthDate) {
        var today = new Date();
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        age = age + m / 12;
        return age;
    }

    function showAge(birthDate) {
        var age = calculateAge(birthDate);
        if (isNaN(age)) {
            return "unknown age";
        } else {
            return age.toFixed(1);
        }
    }

    function matchesRange(age, range) {
        var firstCompare = range[0];
        var secondCompare = range[range.length - 1];
        var ages = range.substring(1, range.length-1).split(',');
        if (ages[1] === "") { ages[1] = Infinity; }
        var firstAnswer = firstCompare === "[" ? age >= ages[0] : age > ages[0];
        var secondAnswer = secondCompare === "]" ? age <= ages[1] : age < ages[1];

        return firstAnswer && secondAnswer;
    }

    function findAppropriateSchedule(user) {
        var age = calculateAge(user.birthDate);
        var immunocompromised = user.immunocompromised;

        var firstVaccineType = null;
        if (user.doses.length > 0) {
            firstVaccineType = user.doses[0].vaccine;
        }
    
        for (var i = 0; i < vaccineSchedule.vaccineSchedules.length; i++) {
            if (firstVaccineType == null || vaccineSchedule.vaccineSchedules[i].vaccine.toLowerCase().startsWith(firstVaccineType.toLowerCase())) {
                for (var j = 0; j < vaccineSchedule.vaccineSchedules[i].schedules.length; j++) {
                    var ageMatch = matchesRange(age, vaccineSchedule.vaccineSchedules[i].schedules[j].ages);
                    var immunocompromisedSchedule = "immunocompromised" in vaccineSchedule.vaccineSchedules[i].schedules[j];
                    if (ageMatch) {
                        if (immunocompromisedSchedule === immunocompromised) {
                            if (firstVaccineType != null) {
                                user.schedule = vaccineSchedule.vaccineSchedules[i].schedules[j];
                            } else {
                                if (user.schedules == null) {
                                    user.schedules = [];
                                }

                                user.schedules.push(vaccineSchedule.vaccineSchedules[i].schedules[j])
                            }
                        }
                    }
                }
            }
        }
    }

    function calculateDosesNeeded(schedule) {
        return schedule.doses.length;
    }

    function showTimeBetween(schedule, dose) {
        var interval = schedule.doses[dose].after;
        var chunks = interval.split(/ |-/);
        var answer;
        switch (chunks.length) {
            case 2:
                answer = interval;
                break;
            case 3:
                if (chunks[0] === chunks[1]) {
                    answer = chunks[0] + " " + chunks[2];
                } else {
                    answer = interval;
                }
                break;
            default:
                console.log("unexpected case");
        }

        return answer;
    }

    function showNextDoseTiming(user, relativeToLastDose = true) {
        if ('schedule' in user) {
            var doseCount = user.doses.length;
            var lastDoseDate = new Date(user.doses[doseCount - 1].date);
            if (doseCount > user.schedule.doses.length) {
                return "more than recommended by CDC"
            } else if (doseCount === user.schedule.doses.length) {
                return "up to date";
            }   

            var interval = user.schedule.doses[doseCount].after;
            var chunks = interval.split(/ |-/);
            var answer;
            switch (chunks.length) {
                case 2:
                    answer = interval;
                    break;
                case 3:
                    if (chunks[0] === chunks[1]) {
                        answer = chunks[0] + " " + chunks[2];
                    } else {
                        answer = interval;
                    }
                    break;
                default:
                    console.log("unexpected case");
            }

            if (relativeToLastDose) {
                return answer + " after " + lastDoseDate.toLocaleDateString('en-US');
            } else {
                return answer;
            }
        }
    }

    function getSampleData() {
        var sample = 'George Washington\n2/22/1732\nPfizer 2/1/2021\nPfizer 4/1/2021\n\nAbraham Lincoln\n2/12/1809\nImmunocompromised\nModerna 2/8/2021\nModerna 4/8/2021\n\nToddler\n2/2/2020';
        var lines = sample.split('\n');
        return lines.join('\n');
    }

    function getStyle(user, schedule, dose) {
        var doseCount = user.doses.length;
        if (doseCount === 0) { return dose === 1 ? "nextDose" : "otherDoses" }
        if (dose >= doseCount + 1) return "nextDose";
        else return "otherDoses";
    }

    function shotLabel(schedule, dose) {
        return "(" + schedule.doses[dose-1].type + ")";
    }

    function showDose(user, schedule, dose) {
        var scheduleToUse;
        if (schedule != null) {
            scheduleToUse = schedule;
        } else {
            scheduleToUse = user.schedule;
        }

        var dosesNeeded = calculateDosesNeeded(scheduleToUse);
        if (dose <= dosesNeeded) return true; 
    }

    function getX(column) {

        return (column-1) * 155 + 50;
    }

    function getDate(user, dose) {
        var doseObj = user.doses[dose-1];
        if (doseObj !== undefined) return doseObj.date;
    }

    function drawSchedule(user, schedule) {
        var index = 0;

        return <>
                    <svg version="1.1" baseProfile="full" 
                        width="900" height="150" 
                        className='tal lm60'
                        xlmns="http://www/w3/org/2000/svg">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                    refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" />
                    </marker>
                </defs>
        <text x='0' y={index * 140 + 40} fill='black'>{schedule.vaccine}</text>
        
        <circle className={getStyle(user,schedule,1)} cx={getX(2)} cy={index * 140 + 50} r='45' />
        <text className='circleText' x={getX(2)} y={index * 140 + 40} fontWeight='bold'>DOSE 1</text> 
        <text className='circleText' x={getX(2)} y={index * 140 + 60}>{shotLabel(schedule,1)}</text>
        <text className='circleText' x={getX(2)} y={index * 140 + 80}>{getDate(user,1)}</text>

       { showDose(user,schedule, 2) ? <>
        <line x1={getX(2)+45} y1={index * 140 + 50} x2={getX(3)-65} y2={index * 140 + 50} stroke="#000"
            strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text className='circleText' x={getX(2)+75} y={index * 140 + 40} fontSize='8pt'>{showTimeBetween(schedule, 1)}</text> 
        <circle className={getStyle(user,schedule,2)} cx={getX(3)} cy={index * 140 + 50} r='45' /> 
        <text className='circleText' x={getX(3)} y={index * 140 + 40} fill='black' fontWeight="bold">DOSE 2</text> 
        <text className='circleText' x={getX(3)} y={index * 140 + 60} fill='black' >{shotLabel(schedule,2)}</text> 
        <text className='circleText' x={getX(3)} y={index * 140 + 80} fill='black' >{getDate(user,2)}</text> 
        </> : false
       }
       { showDose(user, schedule, 3) ? <>
        <line x1={getX(3)+45} y1={index * 140 + 50} x2={getX(4)-65} y2={index * 140 + 50} stroke="#000"
            strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text className='circleText' x={getX(3)+75} y={index * 140 + 40} fontSize='8pt'>{showTimeBetween(schedule, 2)}</text> 
        <circle className={getStyle(user,schedule,3)} cx={getX(4)} cy={index * 140 + 50} r='45' /> 
        <text className='circleText' x={getX(4)} y={index * 140 + 40} fill='black' fontWeight="bold">DOSE 3</text> 
        <text className='circleText' x={getX(4)} y={index * 140 + 60} fill='black' >{shotLabel(schedule,3)}</text> 
        <text className='circleText' x={getX(4)} y={index * 140 + 80} fill='black' >{getDate(user,3)}</text> 
        </> : false
       }
       { showDose(user, schedule, 4) ? <>
        <line x1={getX(4)+45} y1={index * 140 + 50} x2={getX(5)-65} y2={index * 140 + 50} stroke="#000"
            strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text className='circleText' x={getX(4)+75} y={index * 140 + 40} fontSize='8pt'>{showTimeBetween(schedule, 3)}</text> 
        <circle className={getStyle(user,schedule,4)} cx={getX(5)} cy={index * 140 + 50} r='45' /> 
        <text className='circleText' x={getX(5)} y={index * 140 + 40} fill='black' fontWeight="bold">DOSE 4</text> 
        <text className='circleText' x={getX(5)} y={index * 140 + 60} fill='black' >{shotLabel(schedule,4)}</text> 
        <text className='circleText' x={getX(5)} y={index * 140 + 80} fill='black' >{getDate(user,4)}</text> 
        </> : false
       }
       { showDose(user, schedule, 5) ? <>
        <line x1={getX(5)+45} y1={index * 140 + 50} x2={getX(6)-65} y2={index * 140 + 50} stroke="#000"
            strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text className='circleText' x={getX(5)+75} y={index * 140 + 40} fontSize='8pt'>{showTimeBetween(schedule, 4)}</text> 
        <circle className={getStyle(user,schedule,5)} cx={getX(6)} cy={index * 140 + 50} r='45' /> 
        <text className='circleText' x={getX(6)} y={index * 140 + 40} fill='black' fontWeight="bold">DOSE 5</text> 
        <text className='circleText' x={getX(6)} y={index * 140 + 60} fill='black' >{shotLabel(schedule,5)}</text> 
        <text className='circleText' x={getX(6)} y={index * 140 + 80} fill='black' >{getDate(user,5)}</text> 
        </> : false
       }
       </svg>
    </>
    }
    return (
        <>
            <div className='tal'>
                <div className='tal'><b>Modify Vaccine Record for you and your loved ones, then press 'process':</b><br/>
                (or press process to process Washington/Lincoln's vaccine record) </div>
                <textarea className='w400 h250' id='importData' defaultValue={getSampleData()} /><br/>
                <div>(WARNING: if you don't want to type in your info again, save this text to an email or file, before pressing refresh or closing this page.)</div>
                <br/>
                <button onClick={processVaccineRecords}>process</button>
            </div>
            <div className="container tal">
            <br />
            
                { users && users.map((user, index) =>
                    <>
                        <div className='tal lm10'><b>{user.name}</b> ({showAge(user.birthDate)}) {user.immunocompromised ? ", Immunocompromised" : ""}</div>
                        <div className='lm30'>
                        {
                            user.schedule != null ?
                            (user.doses.length >= user.schedule.doses.length ?
                                <span className='goodHighlight'>Up to date: no action needed</span>
                                : <span className='highlight'>Schedule dose {user.doses.length + 1} for: {showNextDoseTiming(user)}</span>)
                            : <span className='highlight'>Choose vaccine type and schedule 1st dose.</span>
                        }
                        </div>
                  {user.schedule != null ? 
                    <>{drawSchedule(user, user.schedule, index)}<br/>
                    
                    </> :
                    user.schedules.map((schedule, index2) => <>{drawSchedule(user, schedule, index + index2)}<br/></>)}
                  </>
                  )
                }
            </div>
        </>
    );
}

export default People;
