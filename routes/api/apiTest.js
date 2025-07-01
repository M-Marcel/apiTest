const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');

// USDTX Contract Details
const CONTRACT_ADDRESS = '0x3c0A98bF35B3Dab9f1C566dc5892064fD638d3D3';
// const ETH_SEPOLIA_RPC =
//   'https://rpc.ankr.com/eth_sepolia/9a1d93fb77d9a969c39f000926de1211379ce7ccaf965daf04b116b12f0ff990';
const ETH_SEPOLIA_RPC =
  'https://lb.drpc.org/ogrpc?network=sepolia&dkey=AuiRyekpDk5fgf8ZEs0m1WnkUcFJIP4R8L9_EjfP07KJ';
const ERC20_ABI = [
  'function totalSupply() view returns (uint256)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address) view returns (uint256)'
];

router.get('/', async (req, res) => {
  try {
    console.log('Connecting to Ethereum Sepolia...');
    const provider = new ethers.providers.JsonRpcProvider(ETH_SEPOLIA_RPC);

    // Create contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC20_ABI, provider);

    // Fetch contract data
    const [symbol, decimals, totalSupply] = await Promise.all([
      contract.symbol(),
      contract.decimals(),
      contract.totalSupply()
    ]);

    const formattedSupply = ethers.utils.formatUnits(totalSupply, decimals);

    console.log('\n=== ERC20 Contract Details ===');
    console.log(`Symbol: ${symbol}`);
    console.log(`Decimals: ${decimals}`);
    console.log(`Total Supply: ${formattedSupply}`);

    // Send response

    const data = {
      symbol,
      decimals,
      totalSupply: formattedSupply
    };

    res.json({ data, success: 'ok' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`ERC20 read failed: ${error.message}`);
  }
});

module.exports = router;
