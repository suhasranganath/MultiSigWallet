var account;
var contract;

$(function(){
    //Check if metamask is installed
    if(typeof web3 !== 'undefined'){
        //document.getElementById('metamask-alert').textContent = "Hurray! Metamask is installed";
        //use metamask/mist provider
        web3js = new Web3(web3.currentProvider);
        document.getElementById('metamask-alert').textContent = "Web3 is loaded "+ web3.version.api;

        //Read abi from MultiSigDAO.js file.
        var abi = JSON.parse(window.contractAbi);
        var address = window.contractAddress;

        var interval = setInterval(function(){
            web3.eth.getAccounts(function(err,result){
                if (typeof result[0] != 'undefined'){
                    if (account == null){
                        account = result[0];
                        console.log("Account being used:"+account);
                        contract = new web3js.eth.Contract(abi,address,{
                            from:result[0],
                        });
                        //contractInstance = contract.at(address);
                        IntialSettings();
                    }else{
                        if(account !== result[0]){
                            account = result[0];
                            console.log("Account being used:"+account);
                            contract = new web3js.eth.Contract(abi, address, {
                                from: result[0],
                            });
                            //contractInstance = contract.at(address);
                        }
                    }
                    
                }
            });
            
        },1000);
        
        function IntialSettings(){
            totalContributors();
            totalOpenProposals();
            currentPhase();
            eventsRC();
            eventsPS();
            eventsPA();
            eventsPR();
            eventsWP();
        }
        

    }else{
        document.getElementById('metamask-alert').textContent = "Metamask is not installed";
    }

});