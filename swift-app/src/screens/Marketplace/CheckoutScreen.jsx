import React from 'react'; import { View, Text } from 'react-native'; import Button from '../../components/Button'; import { useMarketplace } from '../../contexts/MarketplaceContext'; import { useEscrow } from '../../contexts/EscrowContext'; import { useWallet } from '../../contexts/WalletContext';
export default function CheckoutScreen({navigation}){
  const { cart, clearCart } = useMarketplace(); const { createEscrow } = useEscrow(); const { withdraw } = useWallet();
  const total = cart.reduce((s,p)=> s + (p.price||0), 0);
  const onCheckout = async ()=>{ withdraw(total); await createEscrow({ order:{id:Date.now().toString(), items:cart, total} }); clearCart(); alert('Order placed (mock)'); navigation.navigate('Wallet'); };
  return (<View style={{flex:1,padding:20}}><Text style={{fontSize:22,fontWeight:'700'}}>Checkout</Text><Text style={{marginTop:6}}>Total: ₦{total}</Text><View style={{marginTop:10}}><Button title='Pay now (mock)' onPress={onCheckout}/></View></View>);
}
