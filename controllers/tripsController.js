const express = require('express');
const Trip = require('../models/trips');
const Activities = require('../models/activities');


const tripsController = {
   
    newTripPage: async (req, res) => {
        try {
            res.render('Trips-ejs-files/newTripPage.ejs')
        } catch (err){
            res.send(err);
        }
    },
    activityListPage: async (req, res) => {
        try {
            res.render('Trips-ejs-files/newTripPage.ejs')
        } catch (err){
        res.send(err);
        }
    },
    startTripPost: (req, res) => {
        res.redirect(`/trips/plan/${req.body.location}`)
    },
    userNewTripPage: async (req,res)=>{
            const allActivities = await Activities.find({city: req.params.city});
            console.log(allActivities);
            res.render('Trips-ejs-files/userTrip.ejs', {
                activities: allActivities,
                city: allActivities[0].city

            })
            // pass in all the acitivites and the city to the ejs page
    },
    createTrip: async (req, res) => {
        if(req.session.logged){
            try {
                console.log(req.body.activity, "<====this is the req.body.activity")
                const activities = []
                // check if its an array
                // if it is then you have to find all the activities *problem is async
                if(Array.isArray(req.body.activity)) {
                    await Promise.all(req.body.activity.map(async (file) => {
                        activities.push(await Activities.findById(file))
                    }))
                } else {
                    activities.push(await Activities.findById(req.body.activity))
                }
                console.log(activities)
                req.body.city = activities[0].city
                req.body.country = activities[0].country
                req.body.createdBy = req.session.user
                req.body.activity = activities
                
                // const createdTrip = await Trip.create({
                //     city: 'burbank',
                //     country: 'usa',
                //     description: 'this is a new trip',
                //     createdBy: req.session.user
                // })


                // if(activities.length === 0) {
                //     const findActivities = await Activities.findById(req.body.activity)
                //     createdTrip.activity.push(findActivities)
                // } else {
                //     createdTrip.activity.push(...activities)
                // }
                
                // await createdTrip.save()
                // console.log(createdTrip)
                // res.render('/Users-ejs-files/homepage.ejs', {
                //     trips: createdTrip
                // })

                const newTrip = await Trip.create(req.body)
                console.log(newTrip)
                res.redirect('/auth')
                
                // console.log("================StartfindActivities=1================")
                // console.log(findActivities)
                // console.log("================ENDfindActivities=1=================")
            } catch(err) {
                console.log(err)
            }
        
            // find the activity. req.body
            // create the trip
            // push the activity to the trip.activity
            // add the user to the createdBuy in the trip.createdBy
            // then save the trip
            // console.log(Array.isArray(req.body.activity))
            // console.log(req.body.activity)
        } else {
            res.redirect('/')
        }
    },
    deleteTrip: async (req, res) => {

        try {

            const deletedTrip = await Trip.findByIdAndDelete({_id: req.params.id})
            const deletedActivities = await Activities.deleteMany({activity: req.params.id})
            console.log('--------------------')
            console.log(deletedTrip, '<--- this trip was deleted')
            console.log('--------------------')
            console.log(deletedActivities, '<--- these activities in the trip were deleted')
            console.log('--------------------')
            res.redirect('/auth')
            
        } catch (error) {

            console.log(error)
            res.send(error)
            
        }

    }
}

module.exports = tripsController;