
const deployedContractAddress = process.env.DEPLOYED_STAKE_CONTRACT_ADDRESS;

export function handleStakeContract(){
    if(typeof deployedContractAddress == "undefined"){
        const error = new Error("Unable to find contract address");
        throw(error);
    };

    
};