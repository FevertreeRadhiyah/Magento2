<?php
 
namespace Fevertree\Accountpayment\Model;
 
/**
 * Pay In Store payment method model
 */
class Accountpayment extends \Magento\Payment\Model\Method\AbstractMethod
{
 
  

     protected $_infoBlockType = \Fevertree\Accountpayment\Block\Info\Accountpayment::class;
       /**
     * Payment code
     *
     * @var string
     */
   protected $_code = 'accountpayment';
   const CODE = 'accountpayment';  
    protected $_isOffline = true;
    /**
     * @return string
     */
    public function getUsername()
    {
        return $this->getConfigData('businessID');
    }
     /**
     * @return string
     */
    public function getPassword()
    {
        return $this->getConfigData('password');
    }
      /**
     * @return decimal
     */
    public function getOrdertotal()
    {
        return $this->getConfigData('orderTotal');
    }

       public function getOrderID()
    {
        return $this->getConfigData('orderID');
    }
 
}