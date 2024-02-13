//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IPriceFeedExt {
    function latestAnswer() external view returns (int256 priceInfo);
}

contract RisingsTicketRouter is Ownable {
    IERC20 public _risingTicketAddress;
    uint256 public risingTicketPrice_USD;

    mapping (address => uint256) private _userPaid_MATIC;
    IPriceFeedExt public priceFeed_MATIC;
    
    address private teamAddress;

    event BuyRisingsTicket(address _from, address _to, uint256 _amount);
    event WithdrawAll(address addr);

    receive() payable external {}
    fallback() payable external {}

    constructor(address initialOwner) Ownable(initialOwner) {
        _risingTicketAddress = IERC20(0xF136083F4139c27a2ab15311BAdbA902301b342c); // todo: fix address

        priceFeed_MATIC = IPriceFeedExt(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);

        risingTicketPrice_USD = 0.35 * 10 ** 8; // 35 Cents per ticket

        teamAddress = msg.sender;
    }

    function buyRisingsTicketsByMATIC() external payable {
        require(msg.value > 0, "Insufficient MATIC amount");
        uint256 amountPrice = getLatestMATICPrice() * msg.value;

        // risingTicket amount user want to buy
        uint256 risingTicketAmount = amountPrice / risingTicketPrice_USD;

        // transfer risingTicket to user
        _risingTicketAddress.transfer(msg.sender, (risingTicketAmount > 5 * 10 ** 17) ? (risingTicketAmount + 10 ** 16): risingTicketAmount);

        // add USD user bought
        _userPaid_MATIC[msg.sender] += amountPrice;

        // transfer MATIC to teamAddress
        payable(teamAddress).transfer(msg.value);

        emit BuyRisingsTicket(address(this), msg.sender, risingTicketAmount);
    }

    function buyRisingsTicketsByMATICWithReferral(address toReward) external payable {
        require(msg.value > 0, "Insufficient MATIC amount");
        uint256 amountPrice = getLatestMATICPrice() * msg.value;

        // risingTicket amount user want to buy
        uint256 risingTicketAmount = amountPrice / risingTicketPrice_USD;

        // transfer risingTicket to user
        _risingTicketAddress.transfer(msg.sender, (risingTicketAmount > 5 * 10 ** 17) ? (risingTicketAmount + 10 ** 16): risingTicketAmount);

        // transfer reward to referral provider
        payable(toReward).transfer(msg.value * 5 / 100);

        // transfer MATIC to teamAddress
        payable(teamAddress).transfer(msg.value * 95 / 100);

        // add USD user bought
        _userPaid_MATIC[msg.sender] += amountPrice;

        emit BuyRisingsTicket(address(this), msg.sender, risingTicketAmount);
    }

    function getLatestMATICPrice() public view returns (uint256) {
        return uint256(priceFeed_MATIC.latestAnswer());
    }

    function withdrawAll() external onlyOwner {
        uint256 MATICbalance = address(this).balance;
        
        if (MATICbalance > 0)
            payable(owner()).transfer(MATICbalance);

        emit WithdrawAll(msg.sender);
    }

    function withdrawRisingsTicket() public onlyOwner returns (bool) {
        uint256 balance = _risingTicketAddress.balanceOf(address(this));
        return _risingTicketAddress.transfer(msg.sender, balance);
    }

    function getUserPaidMATIC () public view returns (uint256) {
        return _userPaid_MATIC[msg.sender];
    }

    function setRisingsTicketAddress(address _address) public onlyOwner {
        _risingTicketAddress = IERC20(_address);
    }

    /* Price Decimal is 8 */
    function setRisingsTicketPriceByUSD(uint256 _risingTicketPrice) public onlyOwner {
        risingTicketPrice_USD = _risingTicketPrice;
    }

    function setTeamAddress(address _teamAddress) public onlyOwner {
        teamAddress = _teamAddress;
    }
}