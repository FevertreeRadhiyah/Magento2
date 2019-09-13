<?php
/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Fevertree\Accountpayment\Block\Info;

class Accountpayment extends \Magento\Payment\Block\Info
{
 
    /**
     * @var string
     */
    protected $_mailingAddress;

    /**
     * @var string
     */
    protected $_businessID;

    /**
     * @var string
     */
    protected $_password;
 

    /**
     * @var string
     */
    protected $_template = 'Fevertree_Accountpayment::info/accountpayment.phtml';

 
      public function getUsername()
    {
        if ($this->businessID === null) {
            $this->_convertAdditionalData();
        }
        return $this->businessID;
    }
      public function getPassword()
    {
        if ($this->password === null) {
            $this->_convertAdditionalData();
        }
        return $this->password;
    }
   

  

 

    /**
     * Enter description here...
     *
     * @return $this
     */
    protected function _convertAdditionalData()
    {
        $details = @unserialize($this->getInfo()->getAdditionalData());
        if (is_array($details)) {
       
              $this->businessID = $this->getInfo()->getAdditionalInformation('businessID');
               $this->password = $this->getInfo()->getAdditionalInformation('password');
             
            
        } else {
            $this->_payableTo = 'Empty';
            
        }
        return $this;
    }

  
}
