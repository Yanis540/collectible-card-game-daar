// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";


contract Collection is ERC721URIStorage, ERC721Enumerable, Ownable {
  string public collectionName;
  int public cardCount;
  uint256 private _tokenIds = 0;

  // mapping(uint256 => address) private owners;
  mapping(address => uint256[]) public accountsTokens;

  constructor(address initialOwner, string memory _name, int _cardCount) Ownable(initialOwner) ERC721("PokemonCard", "PKMN") {
    collectionName = _name;
    cardCount = _cardCount;
    console.log("Collection created: ", collectionName);
  }

  function mintNFT(address recipient, string memory tokenURI)
      public onlyOwner
      returns (uint256)
  {
      _tokenIds++;

      uint256 newItemId = _tokenIds;
      _mint(recipient, newItemId);
      _setTokenURI(newItemId, tokenURI);
      console.log("Minted: ", tokenURI, newItemId);
      return newItemId;
  }

/* Overriding functions */
  function _increaseBalance(address account, uint128 initialValue) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, initialValue);
  }
  function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable)
    returns(address)
  {
    return super._update(to, tokenId, auth);
  }
  function supportsInterface(bytes4 interfaceId) public view override(ERC721URIStorage, ERC721Enumerable)
    returns(bool)
  {
    return super.supportsInterface(interfaceId);
  }
  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }
  function _baseURI() internal pure override(ERC721)
    returns(string memory)
  {
    return "http://localhost:3030/getCard/";
  }
}
