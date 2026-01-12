// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InvoiceSystem {
    struct Invoice {
        string invoiceNumber;
        string vendorName;
        uint256 amount;
        uint256 tax;
        uint256 total;
        bool exists;
    }

    mapping(string => Invoice) public invoices;

    function createInvoice(string memory _num, string memory _vendor, uint256 _amt, uint256 _tax) public {
        invoices[_num] = Invoice(_num, _vendor, _amt, _tax, _amt + _tax, true);
    }

    function getInvoice(string memory _num) public view returns (string memory, string memory, uint256, bool) {
        Invoice memory inv = invoices[_num];
        return (inv.invoiceNumber, inv.vendorName, inv.total, inv.exists);
    }
}