import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, a página que você acessou não existe."
        extra={<Button type="primary"><Link to="/">Voltar para a página inicial</Link></Button>}
      />
    </div>
  );
};

export default Page404;
