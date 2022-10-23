import './App.scss';
import { useState } from 'react';
import Contract from './components/Contract';
import Button from './components/Button';

function App() {

    const [contracts, setContracts] = useState([
        {
            name: 'AccessControl',
            contents: `// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    abstract contract AccessControl is Context, IAccessControl, ERC165 {
        struct RoleData {
            mapping(address => bool) members;
            bytes32 adminRole;
        }
    
        mapping(bytes32 => RoleData) private _roles;
    
        bytes32 public constant DEFAULT_ADMIN_ROLE = 0x00;
    
        /**
         * @dev Modifier that checks that an account has a specific role. Reverts
         * with a standardized message including the required role.
         *
         * The format of the revert reason is given by the following regular expression:
         *
         *  /^AccessControl: account (0x[0-9a-f]{40}) is missing role (0x[0-9a-f]{64})$/
         *
         * _Available since v4.1._
         */
        modifier onlyRole(bytes32 role) {
            _checkRole(role);
            _;
        }
    
        function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
            return interfaceId == type(IAccessControl).interfaceId || super.supportsInterface(interfaceId);
        }
    
        function hasRole(bytes32 role, address account) public view virtual override returns (bool) {
            return _roles[role].members[account];
        }
    
        function _checkRole(bytes32 role) internal view virtual {
            _checkRole(role, _msgSender());
        }
    
        function _checkRole(bytes32 role, address account) internal view virtual {
            if (!hasRole(role, account)) {
                revert(
                    string(
                        abi.encodePacked(
                            "AccessControl: account ",
                            Strings.toHexString(account),
                            " is missing role ",
                            Strings.toHexString(uint256(role), 32)
                        )
                    )
                );
            }
        }
    
        function getRoleAdmin(bytes32 role) public view virtual override returns (bytes32) {
            return _roles[role].adminRole;
        }
    
        function grantRole(bytes32 role, address account) public virtual override onlyRole(getRoleAdmin(role)) {
            _grantRole(role, account);
        }
    
        function revokeRole(bytes32 role, address account) public virtual override onlyRole(getRoleAdmin(role)) {
            _revokeRole(role, account);
        }
    
        function renounceRole(bytes32 role, address account) public virtual override {
            require(account == _msgSender(), "AccessControl: can only renounce roles for self");
    
            _revokeRole(role, account);
        }
    
        function _setupRole(bytes32 role, address account) internal virtual {
            _grantRole(role, account);
        }
    
        function _setRoleAdmin(bytes32 role, bytes32 adminRole) internal virtual {
            bytes32 previousAdminRole = getRoleAdmin(role);
            _roles[role].adminRole = adminRole;
            emit RoleAdminChanged(role, previousAdminRole, adminRole);
        }

        function _grantRole(bytes32 role, address account) internal virtual {
            if (!hasRole(role, account)) {
                _roles[role].members[account] = true;
                emit RoleGranted(role, account, _msgSender());
            }
        }

        function _revokeRole(bytes32 role, address account) internal virtual {
            if (hasRole(role, account)) {
                _roles[role].members[account] = false;
                emit RoleRevoked(role, account, _msgSender());
            }
        }
                function _grantRole(bytes32 role, address account) internal virtual {
            if (!hasRole(role, account)) {
                _roles[role].members[account] = true;
                emit RoleGranted(role, account, _msgSender());
            }
        }

        function _revokeRole(bytes32 role, address account) internal virtual {
            if (hasRole(role, account)) {
                _roles[role].members[account] = false;
                emit RoleRevoked(role, account, _msgSender());
            }
        }
                function _grantRole(bytes32 role, address account) internal virtual {
            if (!hasRole(role, account)) {
                _roles[role].members[account] = true;
                emit RoleGranted(role, account, _msgSender());
            }
        }

        function _revokeRole(bytes32 role, address account) internal virtual {
            if (hasRole(role, account)) {
                _roles[role].members[account] = false;
                emit RoleRevoked(role, account, _msgSender());
            }
        }
    }`
        }
    ]);

    const uploadFile = () => {
        let file = document.getElementById('file').files[0];
        let formData = new FormData();
        formData.append('file', file);
        fetch('/upload-contract', { method: 'POST', body: formData });
    };

    return (
        <div className='App'>
            <div className={'sidebar'}>
                <h1>Loaded files</h1>
                <p>AccessControl.sol</p>
                <p>AccessControl.sol</p>
                <p>AccessControl.sol</p>
                <div className={'sidebar-footer'}>
                    <div className={'info'}>info</div>
                </div>
            </div>
            <div className={'main'}>
                <header>
                    <h1 className='title'>Gas Profiler</h1>
                    <Button onClick={uploadFile}>load contracts</Button>
                    <input type='file' name='file' id={'file'} />
                </header>
                <div>
                    {contracts.length > 0 ?
                        contracts.map((contract, index) => <Contract key={index} contract={contract} />)
                        : <div>Upload a contract</div>}
                </div>
            </div>
        </div>
    );
}

export default App;
