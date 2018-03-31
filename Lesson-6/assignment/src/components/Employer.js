import React,{Component} from 'react'
import {Layout,Menu,Alert} from 'antd'

import Fund from './Fund'
import EmployeeList from './EmployeeList'

const {Content,Sider} = Layout

class Emploer extends Component {
    constructor(props){
        super(props)
        this.state={mode:'fund'}
    }

    componentDidMount(){
        const {account,payroll} = this.props
        payroll.owner.call({from:account}).then((result) => {
            this.setState({
                owner:result
            })
        })
    }

    onSelectTab = ({key}) => {
        this.setState({
            mode:key
        })
    }



    renderContent = () => {
        const {account,payroll,web3} = this.props
        const {mode,owner} = this.state

        if (owner !== account) {
            return <Alert message="您没有权限" type="error" showIcon />
        }

        // console.log(mode)

        switch(mode) {
            case 'fund':
                return <Fund account={account} payroll={payroll} web3={web3} />
            case 'employees':
                return <EmployeeList account={account} payroll={payroll} web3={web3} onChangeRole={this.props.onChangeRole.bind(this)} />
            default:
                return    
        }
    }

    render(){
        return(
            <Layout style={{padding:'24px 0',background:'#fff'}}>
                <Sider width={200} style={{background:'#fff'}}>
                    <Menu mode="inline" defaultSelectdKeys={['fund']} style={{height:'100%'}} onSelect={this.onSelectTab}>
                        <Menu.Item key="fund">合约信息</Menu.Item>
                        <Menu.Item key="employees">员工信息</Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{padding:'0 24px',minHeight:280}}>
                    {this.renderContent()}
                </Content>    
            </Layout>
        )
    }


}

export default Emploer