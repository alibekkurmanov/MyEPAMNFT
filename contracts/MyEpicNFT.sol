// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

// We need some util functions for strings.
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import { Base64 } from "./libraries/Base64.sol";

contract MyEpicNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

  string[] firstWords = ["Naughty", "True", "Moaning", "Traditional", "Dead", "Domineering", "Salty", "Nacabre", "Ill", "Broken"];
  string[] secondWords = ["Satisfying", "Smooth", "Alike", "Bewildered", "Fragile", "Thoughtful", "Rigid", "Lying", "Shivering", "Selective"];
  string[] thirdWords = ["Advertising", "Pie", "Theory", "Extent", "Concept", "Expression", "Addition", "Feedback", "Idea", "Homework"];
  
  event NewEpicNFTMinted(address sender, uint256 tokenId);

  constructor() ERC721 ("SquareNFT", "SQUARE") {
    console.log("This is my NFT contract. Woah!");
  }

  function pickRandomWord(uint256 tokenId, string[] memory arr) public pure returns (string memory) {
    uint256 rand = random(string(abi.encodePacked("SOMEWORD", Strings.toString(tokenId))));
    rand = rand % arr.length;
    return arr[rand];
  }

  function random(string memory input) internal pure returns (uint256) {
      return uint256(keccak256(abi.encodePacked(input)));
  }

  function makeAnEpicNFT() public {
    uint256 newItemId = _tokenIds.current();

    string memory first = pickRandomWord(newItemId, firstWords);
    string memory second = pickRandomWord(newItemId, secondWords);
    string memory third = pickRandomWord(newItemId, thirdWords);
    string memory combinedWord = string(abi.encodePacked(first, second, third));
    string memory finalSvg = string(abi.encodePacked(baseSvg, combinedWord, "</text></svg>"));

    string memory json = Base64.encode(
        bytes(
            string(
                abi.encodePacked(
                    '{"name": "', combinedWord, '",',
                    '"description": "A highly acclaimed collection of squares.",',
                    '"image": "data:image/svg+xml;base64,', Base64.encode(bytes(finalSvg)), '"}'
                )
            )
        )
    );

    string memory finalTokenUri = string(
        abi.encodePacked("data:application/json;base64,", json)
    );

    console.log("\n--------------------");
    console.log(string(abi.encodePacked(
                "https://nftpreview.0xdev.codes/?code=",
                finalTokenUri
    )));
    console.log("--------------------\n");

    _safeMint(msg.sender, newItemId);
    
    _setTokenURI(newItemId, finalTokenUri);
  
    _tokenIds.increment();
    //console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
    emit NewEpicNFTMinted(msg.sender, newItemId);
  }
}