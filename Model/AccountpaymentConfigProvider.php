<?php
/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Fevertree\Accountpayment\Model;

use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\Framework\Escaper;
use Magento\Payment\Helper\Data as PaymentHelper;

class AccountpaymentConfigProvider implements ConfigProviderInterface
{
    /**
     * @var string[]
     */
    protected $methodCode = 'accountpayment';

    /**
     * @var Checkmo
     */
    protected $method = 'accountpayment';


   



    /**
     * @var Escaper
     */
    protected $escaper;

    /**
     * @param PaymentHelper $paymentHelper
     * @param Escaper $escaper
     */
    public function __construct(
        PaymentHelper $paymentHelper,
        Escaper $escaper
       
      
      
    ) {
        $this->escaper = $escaper;
        $this->method = $paymentHelper->getMethodInstance($this->methodCode);
        

         
      
    }

    /**
     * {@inheritdoc}
     */
    public function getConfig()
    {
        $config = [
            'payment' => [
                'accountpayment' => [       
                
                   
                    'businessID' => $this->getUsername(),
                    'password' => $this->getPassword(),
                    'orderTotal' => $this->getOrdertotal(),
                    'orderID' => $this->getOrderID(),
                    
                    
                   
                   
                ],
            ],
        ];
        
        return $config;
    }




     /**
     * Get username to from config
     *
     * @return string
     */
    protected function getUsername()
    {
        return $this->method->getUsername();
    }

     /**
     * Get password to from config
     *
     * @return string
     */
    protected function getPassword()
    {
        return $this->method->getPassword();
    }

    protected function getOrdertotal()
    {
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $cart = $objectManager->get('\Magento\Checkout\Model\Cart'); 
        $cart->setPaymentMethod('accountpayment');
        $grandTotal = $cart->getQuote()->getGrandTotal() + $cart->getQuote()->getShippingAmount();

        return number_format((float)$grandTotal,2,'.','');

    }
    protected function getOrderID()
    {
        
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $checkout_session = $objectManager->get('\Magento\Checkout\Model\Session');
        $order = $checkout_session->getLastRealOrder();
        $orderId= $order->getEntityId();
         $number = $order->getIncrementId();
        $var = ltrim($number, '0');
        $item = $var;
     //$orderId = $this->_checkoutSession->getLastOrderId();
    
        return $item;
    }
        protected function getLastOrderSequence()
    {
        
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $checkout_session = $objectManager->get('\Magento\Checkout\Model\Session');
        $order = $checkout_session->getLastRealOrder();
        $orderId= $order->getEntityId();
        $number = $order->getIncrementId();
       
     
    
        return $number;
    }
    


  
    
}
