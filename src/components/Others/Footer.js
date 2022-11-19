import React from 'react';
import { CDBBox, CDBFooter, CDBBtn, CDBIcon } from 'cdbreact';

export const Footer = () => {
  return (
    <CDBFooter className="shadow">
      <CDBBox
        display="flex"
        justifyContent="between"
        bottom="0"
        position="absolute"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
        style={{ width: '80%' }}
      >
        <CDBBox display="flex" alignItems="center">
          <a href="/" className="d-flex align-items-center p-0 text-dark">
          </a>
          <small className="ml-2">&copy; Henrique Barucco, 2022. All rights reserved.</small>
        </CDBBox>
        <CDBBox display="flex">
          <CDBBtn flat color="dark" className="mx-3 p-2" href="https://www.linkedin.com/in/henrique-barucco/">
            <CDBIcon fab icon="linkedin" />
          </CDBBtn>
          <CDBBtn flat color="dark" className="p-2" href="https://github.com/HenriqueBarucco">
            <CDBIcon fab icon="github" />
          </CDBBtn>
        </CDBBox>
      </CDBBox>
    </CDBFooter>
  );
};