const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require('@solana/web3.js');


const newPair = new Keypair();
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const wb = await connection.getBalance(new PublicKey(myWallet.publicKey));
        console.log(`=> public key ${publicKey}`);
        console.warn(`=> secret key ${secretKey}`);
        console.log(`=> wallet address ${myWallet.publicKey}`);
        console.warn(`=> wallet secret ${myWallet.secretKey}`);

        console.info(`=>>> wallet balance : ${parseInt(wb) / LAMPORTS_PER_SOL}SOL`);
    } catch (error) {
        console.log(error);
    }
};

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);
        console.info('first airdrop of 2 SOL');
        const fromAirdropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey), 2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirdropSignature);
    } catch (error) {
        console.error(error);
    }
}

const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driverFunction();