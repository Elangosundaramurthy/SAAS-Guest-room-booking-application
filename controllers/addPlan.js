const Plan = require('../model/planModel');
class AddPlan {
    async addPlan(req, res) {
        const { name, price, feature, Duration,number_of_rooms,location,minmum_num_days ,maximum_num_days ,number_of_beds } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'name fields are required' });
        }
        try {
/*             const existingPlan = await Plan.findOne({ name });
            if (existingPlan) {
                return res.status(400).json({ error: 'Plan already exists' });
            } */
            const result = await Plan.collection.insertOne({
                name,
                price,
                feature,
                Duration,
                number_of_rooms,
                location,
                minmum_num_days,
                maximum_num_days,
                number_of_beds
            });
            console.log(result);
            res.status(201).json({
                message:'inerserted',
                data:result,
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
async editplans(req,res){
try{
    const body=req.body;
    const roomid=req.params.id;
    console.log(body,roomid);
    const onlykets=[
        "name",
        "price",
        "feature",
        "number_of_rooms",
        "location",
        "minmum_num_days",
        "maximum_num_days",
        "number_of_beds"
    ];
    let premitted = Object.keys(body).every((key) =>
        onlykets.includes(key)
      );
    if(!premitted){
        return res.status(400).json({data:{}, error: "no key matched" });
    }
    const updatedTicket = await Plan.findOneAndUpdate(
        { _id: roomid },
        { $set: body },
        { new: true }
    );
    return res.status(200).json({updatedTicket})
}
catch(err){

}
}
}
module.exports = new AddPlan();
