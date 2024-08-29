document.addEventListener('alpine:init', () => {
    Alpine.data('TotalPhoneBillSQL', function () {
        return {
            title: 'Total PhoneBill SQL',
            createPlan: '',
            deletePlanName: '',
            deleteStatus:'',
            updateStatus:'',
            newPlanName: '',
            newCallCost: '',
            newSmsCost: '',
            updatePlan: '',
            pricePlans: [],
            phonebill: '',
            billMessage: '',
            billReturn: '',
            updatePlanName: '',
            updateCallCost: '',
            updateSmsCost: '',
            createStatus:'',
            init(){
                this.getPricePlans()
            },



            createPlan() {
                axios.post('http://localhost:4011/api/price_plan/create', {
                    name: this.newPlanName,
                    call_cost: this.newCallCost,
                    sms_cost: this.newSmsCost
                }).then(response => {
                    this.createStatus = response.data.message
                    console.log(this.pricePlans)
                    this.newSmsCost = ''
                    this.newCallCost = ''
                    this.newPlanName = ''
                    this.getPricePlans()
            }).catch(error => (
                    console.log(error)
                ))
            },

            deletePlan() {
                return axios.post('http://localhost:4011/api/price_plan/delete', {
                    id: this.deletePlanName
                }).then(response => {
                    this.deleteStatus = response.data.message
                    this.getPricePlans()
                })
            },

            updatePlan() {
                return axios.post('http://localhost:4011/api/price_plan/update', {
                    name: this.updatePlanName,
                    call_cost: this.updateCallCost,
                    sms_cost: this.updateSmsCost
                }).then(response => {
                    this.createStatus = response.data.message
                    this.updateSmsCost = ''
                    this.updateCallCost = ''
                    this.updatePlanName = ''
                    this.getPricePlans()
            }).catch(error => (
                    console.log(error)
                ))
            },


            getPricePlans() {
                const pricePlansURL = `http://localhost:4011/api/price_plans/`;
                return axios.get(pricePlansURL)
                    .then(response => {
                        this.pricePlans = []
                        const n=response.data.length
                        for (let i = 0 ; i < n ; i++){
                            if (response.data[i].plan_name ==null){
                                continue
                            }
                            this.pricePlans.push({
                                id: response.data[i].id,
                                planName: response.data[i].plan_name,
                                smsCost: response.data[i].sms_price,
                                callCost: response.data[i].call_price,

                            })
                        } 

                    })
            },

            phonebill() {
                // Validate user input (optional, but recommended for robustness)
                if (!this.billReturn) {
                  alert('Please enter your phone actions.');
                  return;
                }
              
                axios.post('http://localhost:4011/api/phonebill/', {
                  bill: this.billReturn
                })
                  .then(async (response) => {
                    const { data: { total } } = response; // Destructure response data
                    this.billMessage = `Total: $${total}`;
                  })
                  .catch(error => {
                    console.error('Error calculating phone bill:', error);
                    this.billMessage = 'An error occurred. Please try again later.'; // Informative error message
                  });
            }  
        }
    }
    )
})