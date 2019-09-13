<?php

namespace Fevertree\Accountpayment\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Store\Model\ScopeInterface;

class Data extends AbstractHelper
{

	const XML_PATH_CUSTOMPAYMENT = 'accountpayment/';

	public function getConfigValue($field, $storeId = null)
	{
		return $this->scopeConfig->getValue(
			$field, ScopeInterface::SCOPE_STORE, $storeId
		);
	}

	public function getGeneralConfig($code, $storeId = null)
	{

		return $this->getConfigValue(self::XML_PATH_CUSTOMPAYMENT .'general/'. $code, $storeId);
	}
	public function getMyValue(){

		
			$myvalue = $this->_scopeConfig->getValue('general/store_information/password', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
		 return $myvalue;
 }

}