const subscribe=require('../model/subscribeModel');
const Plan = require('../model/planModel');
const {User} = require('../model/usermodel');
class SubscribeControllers {
    async subscribePlan(req, res) {
        const { user_id, plan_id } = req.body;
        if (!user_id || !plan_id) {
            return res.status(400).json({ error: 'User ID and Plan ID are required' });
        }
        try {
            const existingUser = await User.findById(user_id);
            if (!existingUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            const plaeeeee = await Plan.findById(plan_id);
            if (!plaeeeee) {
                return res.status(404).json({ error: 'Plan not found' });
            }
            const dual = await subscribe.findById(user_id);
            if (dual) {
                return res.status(404).json({ error: 'you are been occupied with the plan' });
            }
            const newSubscription = new subscribe({
                user_id,
                plan_id,
                start_date: new Date(),
                username: existingUser.username,
                mobile_number:existingUser.mobile,
                email_id:existingUser.email,
                price_of_the_paln:plaeeeee.price,
                extra_features:plaeeeee.feature,
                number_of_rooms:plaeeeee.number_of_rooms,
                location:plaeeeee.location,
                minimum_days:plaeeeee.minmum_num_days,
                maximum_days:plaeeeee.maximum_num_days,
                numbers_of_beds:plaeeeee.number_of_beds,
                plan_feature:plaeeeee.feature,
            });
            await newSubscription.save();
            res.status(200).json({
                message: 'Subscription created successfully',
                subscription: newSubscription
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new SubscribeControllers();