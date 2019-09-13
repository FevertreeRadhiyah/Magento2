define(
    [
        'Magento_Checkout/js/view/payment/default',
        'jquery',
        'Magento_Checkout/js/action/set-payment-information',
           'Magento_Checkout/js/model/quote',
       'Magento_Catalog/js/price-utils',
       'Magento_Checkout/js/model/totals'
    ],
    function (Component,quote,
    priceUtils,totals) {
        'use strict';

  if( window.localStorage )
  {
    if( !localStorage.getItem('firstLoad') )
    {
      localStorage['firstLoad'] = true;
      window.location.reload();
    }  
    else
      localStorage.removeItem('firstLoad');
  }

        function guid() {
             return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
            }

         function  s4 () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
            }


         function sendOTPFunc() {

    
        var GUID = document.getElementById('GUID').value = guid();
        var username = document.getElementById('FTUsername').innerHTML;
        var password = document.getElementById('FTPassword').innerHTML;


        var cardIDNumber = document.getElementById('idNumber').value;
        var data = {TransactionID: GUID, CardOrIDNumber: cardIDNumber};

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.crossOrigin = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                var obj = JSON.parse(this.responseText)

                var successResponse = obj.Success;
                document.getElementById('otpSent').value = successResponse;
                if (successResponse == true) {

                    var labelB = document.getElementById('labelBalance');
                    labelB.style.display = "none";

                      var verifyLabel =  document.getElementById('pinverifylabel');
                      verifyLabel.style.display = "block";

                      var optBOX = document.getElementById('OTP');
                      optBOX.style.display = "block";

                      var verifyPinBtn = document.getElementById('pinverifybtn');
                      verifyPinBtn.style.display = "block";
                   
                      
                        
                    console.log('Success Balance lookup' + this.responseText);

                }
                else if (successResponse == false) {
                    var obj = JSON.parse(this.responseText);
                    var messageResponse = obj.Message;

                    var labelB = document.getElementById('labelBalance');
                    labelB.style.display = "block";
                    labelB.style.color = "red";
                    labelB.innerHTML = "There seemed to be an error :" + messageResponse + "";
                     var sendO = document.getElementById('SendOTP');
                      sendO.style.display = "block";
                }
            }

        });

        xhr.open("POST", "https://api.fevertreefinance.co.za/FTIntegration.svc/SendOTP");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("dataType", "jsonp");


        xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));

        xhr.send(JSON.stringify(data));


    }

        return Component.extend({
            defaults: {
                template: 'Fevertree_Accountpayment/payment/accountpayment'

            },
        


             getUsername: function() {


            return window.checkoutConfig.payment.accountpayment.businessID;
            },
              getPassword: function() {

            return window.checkoutConfig.payment.accountpayment.password;
            },


            getOrdertotal : function()
            {
                 
                 return window.checkoutConfig.payment.accountpayment.orderTotal + '-Include Shipping';
            },
              getOrderID : function()
            {
                
                 return window.checkoutConfig.payment.accountpayment.orderID;
            },
           
            placeOrderTest :function()
            {
                var self = this;
                var pinVerified = document.getElementById('pinSuccess').value;
               
              
                if (pinVerified == "") {

                     var OTPResults = document.getElementById('otpResult');
                                 otpResult.style.display = "none";
                     var labelB = document.getElementById('labelBalance');
                     labelB.style.display = "block";
                     labelB.style.color = "red";
                     labelB.innerHTML = "You have not verified the OTP, You cannot place the order.Please verify the OTP and try again.";

                }
                if (pinVerified == 'false') {
                     var OTPResults = document.getElementById('otpResult');
                                 otpResult.style.display = "none";
                     var labelB = document.getElementById('labelBalance');
                     labelB.style.display = "block";
                     labelB.style.color = "red";
                     labelB.innerHTML = "You have not verified the OTP, You cannot place the order.Please verify the OTP and try again.";
                       var numberO =  window.checkoutConfig.payment.accountpayment.orderID;
                     var orderNum = 'M -' + Number(numberO) + 1
                     
                      console.log(orderNum);

                }
               if (pinVerified == 'true') {

                   var GUID = document.getElementById('GUID').value = guid();
                    var username = document.getElementById('FTUsername').innerHTML;
                    var password = document.getElementById('FTPassword').innerHTML;
                     var cartTotal = document.getElementById('orderT').innerHTML;
                    var numberO =  window.checkoutConfig.payment.accountpayment.orderID;
                    var orderNum = Number(numberO) + 1;
                     
                    var itemsNumber = 'M-'+ orderNum;
                    
                      console.log(orderNum);
                       console.log(cartTotal);
                    var valueT = parseFloat(Math.round(cartTotal * 100)/100).toFixed(2);
                  
                   
                    var cardIDNumber = document.getElementById('idNumber').value;
                    var data = {TransactionID: GUID, CardOrIDNumber: cardIDNumber,Amount :cartTotal,PartnerReference:itemsNumber};

                    var xhr = new XMLHttpRequest();
                    xhr.withCredentials = false;
                    xhr.crossOrigin = true;
                    xhr.addEventListener("readystatechange", function () {
                        if (this.readyState === 4) {
                            console.log(this.responseText);
                            var obj = JSON.parse(this.responseText)

                            var successResponse = obj.Success;
                            
                           
                            if (successResponse == true) {
                             
                              self.placeOrder();

                            }
                            else if (successResponse == false) {
                                var obj = JSON.parse(this.responseText)
                                var messageResponse = obj.Message;

                                var labelB = document.getElementById('labelBalance');
                                labelB.style.display = "block";
                                labelB.style.color = "red";
                                labelB.innerHTML ="There seemed to be an error :" + messageResponse + "";
                              
                            }
                        }

                    });

                    xhr.open("POST", "https://api.fevertreefinance.co.za/FTIntegration.svc/ProcessTransaction");
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("Cache-Control", "no-cache");
                    xhr.setRequestHeader("dataType", "jsonp");


                    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));

                    xhr.send(JSON.stringify(data));

          
                 
                    
               
                }
               
               
             
            },
           getCode: function() {
                return 'accountpayment';
            },
            getData: function () {
                return {
                    'method': this.item.method,
                    'additional_data': {
                        'payment': 'accountpayment'
                    }
                };
            },

              click: function($){
        
                    var GUID = document.getElementById('GUID').value = guid();
                    var username = document.getElementById('FTUsername').innerHTML;
                    var password = document.getElementById('FTPassword').innerHTML;
                     var cartTotal = document.getElementById('orderT').innerHTML;
                    
                    var sendOT = document.getElementById('SendOTP');
                    sendOT.style.display = "none";

                     

                     console.log(cartTotal);
                    var valueT = parseFloat(Math.round(cartTotal * 100)/100).toFixed(2);
                  
                   
                    var cardIDNumber = document.getElementById('idNumber').value;
                    var data = {BalanceID: GUID, CardOrIDNumber: cardIDNumber};

                    var xhr = new XMLHttpRequest();
                    xhr.withCredentials = false;
                    xhr.crossOrigin = true;
                    xhr.addEventListener("readystatechange", function () {
                        if (this.readyState === 4) {
                            console.log(this.responseText);
                            var obj = JSON.parse(this.responseText)

                            var successResponse = obj.Success;
                            var accountBalance = parseFloat(obj.Available);
                            document.getElementById('otpSent').value = successResponse;
                            if (successResponse == true) {
                               if (valueT > accountBalance) {

                                var labelB = document.getElementById('labelBalance');
                                labelB.style.display = "block";
                                labelB.style.color = "red";
                                labelB.innerHTML = "You do not have enough funds to process this transaction, Your available balance is : " + accountBalance + ". Please review your cart and retry.";

                               }
                               else{

                                       var sendOT = document.getElementById('SendOTP');
                                       sendOT.style.display = "block";
                                        sendOTPFunc();
                                }

                            }
                            else if (successResponse == false) {
                                var obj = JSON.parse(this.responseText)
                                var messageResponse = obj.Message;

                                var labelB = document.getElementById('labelBalance');
                                labelB.style.display = "block";
                                labelB.style.color = "red";
                                labelB.innerHTML ="There seemed to be an error :" + messageResponse + "";
                               var sendOT = document.getElementById('SendOTP');
                              sendOT.style.display = "block";
                            }
                        }

                    });

                    xhr.open("POST", "https://api.fevertreefinance.co.za/FTIntegration.svc/BalanceLookup");
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("Cache-Control", "no-cache");
                    xhr.setRequestHeader("dataType", "jsonp");


                    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));

                    xhr.send(JSON.stringify(data));

           

            },

              verifyOTP : function()
            {
                 
                var GUID = document.getElementById('GUID').value = guid();
               var username = document.getElementById('FTUsername').innerHTML;
               var password = document.getElementById('FTPassword').innerHTML;
               console.log(password);
                 var labelB = document.getElementById('labelBalance');
                 labelB.style.display = "none";

                  var sendOT = document.getElementById('pinverifybtn');
                    sendOT.style.display = "none";

                var inputValue = document.getElementById('OTP').value;
                var cardIDNumber = document.getElementById('idNumber').value;
                if (inputValue == "") {

                    var OTPResults = document.getElementById('otpResult');
                    otpResult.style.display = "block";
                    otpResult.style.color = "red";
                    otpResult.innerHTML = "No pin entered, Please provide the pin SMS'd to you";
                    
                } else {

                    //do API check
                    var data = {TransactionID: GUID, CardOrIDNumber: cardIDNumber, OTP: inputValue};

                    var xhr = new XMLHttpRequest();
                    xhr.withCredentials = false;
                    xhr.crossOrigin = true;
                    xhr.addEventListener("readystatechange", function () {
                        if (this.readyState === 4) {
                            // debugger;
                            console.log(this.responseText);
                            var obj = JSON.parse(this.responseText);
                              var sendOT = document.getElementById('pinverifybtn');
                              sendOT.style.display = "block";

                            var successResponse = obj.Success;
                            document.getElementById('pinSuccess').value = successResponse;
                            if (successResponse == false) {

                                var OTPResults = document.getElementById('otpResult');
                                 otpResult.style.display = "block";
                                 otpResult.style.color = "red";
                                 otpResult.innerHTML = "The entered pin is incorrect, Please enter the correct pin sent to you.If your cell number is not registered to your account you cannot proceed. - For queries, please call 0861 007 709";
                               
                                 var optBOX = document.getElementById('OTP');
                                 optBOX.style.borderColor = "red";
                      
                            } else {

                               var sendOT = document.getElementById('pinverifybtn');
                              sendOT.style.display = "block";
                                var optBOX = document.getElementById('OTP');
                                 var OTPResults = document.getElementById('otpResult');
                                 otpResult.style.display = "block";
                                 otpResult.innerHTML = "Pin verified succesfully,You may continue and place your order";
                                 
                                 otpResult.style.color = "green";
                                 optBOX.style.borderColor = "green";
                            
                                 
                               
                            }
                        }

            });


            xhr.open("POST", "https://api.fevertreefinance.co.za/FTIntegration.svc/CheckOTP");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.setRequestHeader("dataType", "jsonp");


            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));

            xhr.send(JSON.stringify(data));
        }

     }
      

        });
    }
);
