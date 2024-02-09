import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width:'100%',
  padding: '1rem'     ,
  textAlign: 'center',
  height: 60,
};

const AppHeader = () => {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const {crypto} = useCrypto()

  useEffect(() => {
    const keypress = event => {
      if(event.key === '/'){
        setSelect(prev => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  },[])
  function handleSelect(value){
    setCoin(crypto.find(c => c.id === value))
    setModal(true)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ 
          width: 250 
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect(prev => !prev)}
        value='press / to open'
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space style={{
            display: 'flex',
            alignItems: 'center',
            
          }}>
            <img 
              style={{
                width:20,
                display: 'block',
              }} 
              src={option.data.icon} 
              alt={option.data.label}
            />
            {' '} 
            <div>
              {option.data.label}
            </div>
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

      <Modal 
        open={modal} 
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin}/>
      </Modal>
      <Drawer width={600} title="Add Asset" onClose={() => setDrawer(false)} open={drawer} destroyOnClose >   
        <AddAssetForm onClose={() => setDrawer(false)}/>
      </Drawer>
    </Layout.Header>
  );
}
 
export default AppHeader;