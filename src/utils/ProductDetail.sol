// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ProductDetail {

    uint256 public ProductDetailCount;

    event Transfer(
        address from,
        string[] items,
        string productId,
        uint256 timestamp
    );

    struct ProductDetailStruct {
        address sender;
        string[] items; 
        string  productId;
        uint256 timestamp;
    }

    ProductDetailStruct[] ProductDetails;
    
    function AddToBlockchain(
        string[] calldata itemList,
        string memory productId
    ) public {

        for (uint i = 0; i < ProductDetails.length; i++) {
            if(keccak256(abi.encodePacked(ProductDetails[i].productId)) == keccak256(abi.encodePacked(productId))){
                revert("Product already exists");
            }
        }

        ProductDetailCount++;
        ProductDetails.push(
            ProductDetailStruct(
                msg.sender,
                itemList,
                productId,
                block.timestamp
            )
        );
    }

    function getAllProductDetails()
        public
        view
        returns (ProductDetailStruct[] memory)
    {
        return ProductDetails;
    }

    function getProductDetailCount() public view returns (uint256) {
        return ProductDetailCount;
    }

    function getProductDetail(string memory productId) public view  returns (ProductDetailStruct memory) {
        for (uint256 i = 0; i < ProductDetailCount; i++) {
            if (keccak256(abi.encodePacked(ProductDetails[i].productId)) == keccak256(abi.encodePacked(productId))) {
                return ProductDetails[i];
            }
        }
        return ProductDetailStruct(address(0), new string[](0), "", 0);

    }


    function setProductDetail (string[] memory itemList, string memory productId) public {
        for (uint i = 0; i < ProductDetails.length; i++) {
            if(keccak256(abi.encodePacked(ProductDetails[i].productId)) == keccak256(abi.encodePacked(productId))) {
                
                ProductDetails[i] = ProductDetailStruct(
                                    msg.sender,
                                    itemList,
                                    productId,
                                    block.timestamp
                                );
                return;
            }
        }
        return;
    }

    function deleteAll () public {
        //delete all the items in the array
        delete ProductDetails;
        ProductDetailCount = 0;
        return;
    }




}
