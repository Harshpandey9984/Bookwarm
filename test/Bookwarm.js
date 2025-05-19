const { expect } = require("chai");
const { ethers } = require("hardhat");
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

// Global constants for listing an item
const ID = 1;
const NAME = "Paracetamol";
const CATEGORY = "Antibiotics";
const IMAGE = "https://www.orionlifes.com/wp-content/uploads/2022/04/brexodol-tab-1024x768.jpeg";
const COST = tokens(1);
const RATING = 4;
const STOCK = 5;

describe("Bookwarm", () => {
  let bookwarm;
  let deployer, buyer;

  beforeEach(async () => {
    // Setup accounts
    [deployer, buyer] = await ethers.getSigners();

    // Deploy contract to the Polygon network
    const Bookwarm = await ethers.getContractFactory("Bookwarm");
    bookwarm = await Bookwarm.deploy();
    await bookwarm.deployed();
  });

  describe("Deployment", () => {
    it("Sets the owner", async () => {
      expect(await bookwarm.owner()).to.equal(deployer.address);
    });
  });

  describe("Listing", () => {
    it("Returns item attributes", async () => {
      await bookwarm.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      );

      const item = await bookwarm.items(ID);
      expect(item.id).to.equal(ID);
      expect(item.name).to.equal(NAME);
      expect(item.category).to.equal(CATEGORY);
      expect(item.image).to.equal(IMAGE);
      expect(item.cost).to.equal(COST);
      expect(item.rating).to.equal(RATING);
      expect(item.stock).to.equal(STOCK);
    });
  });

  // Add other test cases for buying, withdrawing, etc.
});
