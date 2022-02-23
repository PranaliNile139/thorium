const express = require('express');
const router = express.Router();
 
const playersInfo = [ {
        name: "manish",
        dob: "1/1/1995",
        gender: "male",
        city: "jalandhar",
        sports: ["swimming"],
        bookings: [ {
            bookingNumber: 1,
            sportId: "",
            centerId: "",
            type: "private",
            slot: 16286598000000,
            bookedOn: "31/08/2021",
            bookedFor: "01/09/2021"
        },
        {
            bookingNumber: 2,
            sportId: "",
            centerId: "",
            type: "private",
            slot: 16286518000000,
            bookedOn: "31/08/2001",
            bookedFor: "01/09/2001"
        } ]
    },
    {
        name: "lokesh",
        dob: "1/1/1990",
        gender: "male",
        city: "mumbai",
        sports: ["soccer"],
        bookings: []
    },
    {
        name: "gopal",
        dob: "1/09/1995",
        gender: "male",
        city: "delhi",
        sports: ["soccer"],
        bookings: [ {
            bookingNumber: 4,
            sportId: "",
            centerId: "",
            type: "private",
            slot: 16284567000000,
            bookedOn: "31/01/2022",
            bookedFor: "31/05/2022"
        } ]
    },
    {
        name: "pranoj",
        dob: "13/09/1995",
        gender: "male",
        city: "mumbai",
        sports: ["cricket"],
        bookings: []
    } 
]
    router.post('/players/:name', function(req, res) {
        let nameInfo = req.params.name

        let input = req.body.newInfo
        // input.name = nameInfo

        for(let i=0; i<playersInfo.length; i++) {
            if(nameInfo === playersInfo[i].name) {
                console.log("Data already exist")
                res.send("Data already exists")
            } else if (i === playersInfo.length - 1) {
                playersInfo.push(input)
                console.log(input)
                res.send({playersInfo})
            }

            // if(playersInfo[i].name != nameInfo) {
            //     playersInfo.push(input)
            //     console.log(input)
            //     res.send(playersInfo)
            // } else {
            //     res.send("name already exists")
            //     break;
            // }
        }
    })
    router.post('/players/:playerName/bookings/:bookingId', function(req, res) {
        let nameInfo = req.params.playerName
        let bookingInfo = req.params.bookingId
        let bookingsInfo = req.body
        for(let i=0; i<playersInfo.length; i++) {
            if(playersInfo[i].name === nameInfo) {
                let array = playersInfo[i].bookings
                if(array.length === 0) {
                    array.push(bookingsInfo)
                    res.send(playersInfo)
                } else {
                    for(let j=0; j<array.length; j++) {
                        if(array[j].bookingNumber != bookingInfo) {
                            array.push(bookingsInfo)
                            res.send(playersInfo)
                        } else {
                            res.send("Booking Id already exist")
                        }
                    }
                }
            }
        }
        res.send("Name doesnot exist")    
    })
        module.exports = router;