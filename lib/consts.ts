export const contractAddress =
    '0x3badbaf11a9d11cf8e580baa79a4bc993b205d8056e6c0a615750bfd022b4f0';
export const contractABI = [
    {
        name: 'SimpleRewardsImpl',
        type: 'impl',
        interface_name: 'staking_stbull::staking::IStakingRewards'
    },
    {
        name: 'core::integer::u256',
        type: 'struct',
        members: [
            {
                name: 'low',
                type: 'core::integer::u128'
            },
            {
                name: 'high',
                type: 'core::integer::u128'
            }
        ]
    },
    {
        name: 'staking_stbull::staking::IStakingRewards',
        type: 'interface',
        items: [
            {
                name: 'stake',
                type: 'function',
                inputs: [
                    {
                        name: 'amount',
                        type: 'core::felt252'
                    }
                ],
                outputs: [],
                state_mutability: 'external'
            },
            {
                name: 'unstake',
                type: 'function',
                inputs: [
                    {
                        name: 'amount',
                        type: 'core::felt252'
                    }
                ],
                outputs: [],
                state_mutability: 'external'
            },
            {
                name: 'claim',
                type: 'function',
                inputs: [],
                outputs: [
                    {
                        type: 'core::integer::u256'
                    }
                ],
                state_mutability: 'external'
            },
            {
                name: 'update_rewards_index',
                type: 'function',
                inputs: [
                    {
                        name: 'reward',
                        type: 'core::felt252'
                    }
                ],
                outputs: [],
                state_mutability: 'external'
            },
            {
                name: 'calculate_rewards_earned',
                type: 'function',
                inputs: [
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress'
                    }
                ],
                outputs: [
                    {
                        type: 'core::integer::u256'
                    }
                ],
                state_mutability: 'view'
            },
            {
                name: 'staking_Token',
                type: 'function',
                inputs: [],
                outputs: [
                    {
                        type: 'core::starknet::contract_address::ContractAddress'
                    }
                ],
                state_mutability: 'view'
            },
            {
                name: 'rewards_Token',
                type: 'function',
                inputs: [],
                outputs: [
                    {
                        type: 'core::starknet::contract_address::ContractAddress'
                    }
                ],
                state_mutability: 'view'
            },
            {
                name: 'total_Staked',
                type: 'function',
                inputs: [],
                outputs: [
                    {
                        type: 'core::integer::u256'
                    }
                ],
                state_mutability: 'view'
            },
            {
                name: 'get_remaining_time',
                type: 'function',
                inputs: [],
                outputs: [
                    {
                        type: 'core::integer::u64'
                    }
                ],
                state_mutability: 'view'
            },
            {
                name: 'updateStakingDuration',
                type: 'function',
                inputs: [
                    {
                        name: 'duration',
                        type: 'core::integer::u64'
                    }
                ],
                outputs: [],
                state_mutability: 'external'
            },
            {
                name: 'get_staking_duration',
                type: 'function',
                inputs: [],
                outputs: [
                    {
                        type: 'core::integer::u64'
                    }
                ],
                state_mutability: 'view'
            }
        ]
    },
    {
        name: 'constructor',
        type: 'constructor',
        inputs: [
            {
                name: '_owner',
                type: 'core::starknet::contract_address::ContractAddress'
            },
            {
                name: '_staking_token',
                type: 'core::starknet::contract_address::ContractAddress'
            }
        ]
    },
    {
        kind: 'struct',
        name: 'staking_stbull::staking::StakingRewards::Staked',
        type: 'event',
        members: [
            {
                kind: 'data',
                name: 'amount',
                type: 'core::felt252'
            }
        ]
    },
    {
        kind: 'struct',
        name: 'staking_stbull::staking::StakingRewards::Unstaked',
        type: 'event',
        members: [
            {
                kind: 'data',
                name: 'amount',
                type: 'core::felt252'
            }
        ]
    },
    {
        kind: 'struct',
        name: 'staking_stbull::staking::StakingRewards::Claimed',
        type: 'event',
        members: [
            {
                kind: 'data',
                name: 'reward',
                type: 'core::integer::u256'
            }
        ]
    },
    {
        kind: 'enum',
        name: 'staking_stbull::staking::StakingRewards::Event',
        type: 'event',
        variants: [
            {
                kind: 'nested',
                name: 'Staked',
                type: 'staking_stbull::staking::StakingRewards::Staked'
            },
            {
                kind: 'nested',
                name: 'Unstaked',
                type: 'staking_stbull::staking::StakingRewards::Unstaked'
            },
            {
                kind: 'nested',
                name: 'Claim',
                type: 'staking_stbull::staking::StakingRewards::Claimed'
            }
        ]
    }
];

export const tokenAddress =
    '0x038e0696b6932405dff6e0b5af7d2b629bb62a02fe0c2a7c1018c870db120a60';
export const tokenABI = [
    {
        name: 'IERC20Impl',
        type: 'impl',
        interface_name: 'staking_stbull::erc20::IERC20'
    },
    {
        name: 'staking_stbull::erc20::IERC20',
        type: 'interface',
        items: [
            {
                name: 'get_name',
                type: 'function',
                inputs: [],
                outputs: [
                    {
                        type: 'core::felt252'
                    }
                ],
                state_mutability: 'view'
            },
            {
                name: 'get_symbol',
                type: 'function',
                inputs: [],
                outputs: [
                    {
                        type: 'core::felt252'
                    }
                ],
                state_mutability: 'view'
            },
            {
                name: 'get_decimals',
                type: 'function',
                inputs: [],
                outputs: [
                    {
                        type: 'core::integer::u8'
                    }
                ],
                state_mutability: 'view'
            },
            {
                name: 'get_total_supply',
                type: 'function',
                inputs: [],
                outputs: [
                    {
                        type: 'core::felt252'
                    }
                ],
                state_mutability: 'view'
            },
            {
                name: 'balance_of',
                type: 'function',
                inputs: [
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress'
                    }
                ],
                outputs: [
                    {
                        type: 'core::felt252'
                    }
                ],
                state_mutability: 'view'
            },
            {
                name: 'allowance',
                type: 'function',
                inputs: [
                    {
                        name: 'owner',
                        type: 'core::starknet::contract_address::ContractAddress'
                    },
                    {
                        name: 'spender',
                        type: 'core::starknet::contract_address::ContractAddress'
                    }
                ],
                outputs: [
                    {
                        type: 'core::felt252'
                    }
                ],
                state_mutability: 'view'
            },
            {
                name: 'transfer',
                type: 'function',
                inputs: [
                    {
                        name: 'recipient',
                        type: 'core::starknet::contract_address::ContractAddress'
                    },
                    {
                        name: 'amount',
                        type: 'core::felt252'
                    }
                ],
                outputs: [],
                state_mutability: 'external'
            },
            {
                name: 'transfer_from',
                type: 'function',
                inputs: [
                    {
                        name: 'sender',
                        type: 'core::starknet::contract_address::ContractAddress'
                    },
                    {
                        name: 'recipient',
                        type: 'core::starknet::contract_address::ContractAddress'
                    },
                    {
                        name: 'amount',
                        type: 'core::felt252'
                    }
                ],
                outputs: [],
                state_mutability: 'external'
            },
            {
                name: 'approve',
                type: 'function',
                inputs: [
                    {
                        name: 'spender',
                        type: 'core::starknet::contract_address::ContractAddress'
                    },
                    {
                        name: 'amount',
                        type: 'core::felt252'
                    }
                ],
                outputs: [],
                state_mutability: 'external'
            },
            {
                name: 'increase_allowance',
                type: 'function',
                inputs: [
                    {
                        name: 'spender',
                        type: 'core::starknet::contract_address::ContractAddress'
                    },
                    {
                        name: 'added_value',
                        type: 'core::felt252'
                    }
                ],
                outputs: [],
                state_mutability: 'external'
            },
            {
                name: 'decrease_allowance',
                type: 'function',
                inputs: [
                    {
                        name: 'spender',
                        type: 'core::starknet::contract_address::ContractAddress'
                    },
                    {
                        name: 'subtracted_value',
                        type: 'core::felt252'
                    }
                ],
                outputs: [],
                state_mutability: 'external'
            }
        ]
    },
    {
        name: 'constructor',
        type: 'constructor',
        inputs: [
            {
                name: 'recipient',
                type: 'core::starknet::contract_address::ContractAddress'
            },
            {
                name: 'name',
                type: 'core::felt252'
            },
            {
                name: 'decimals',
                type: 'core::integer::u8'
            },
            {
                name: 'initial_supply',
                type: 'core::felt252'
            },
            {
                name: 'symbol',
                type: 'core::felt252'
            }
        ]
    },
    {
        kind: 'struct',
        name: 'staking_stbull::erc20::erc20::Transfer',
        type: 'event',
        members: [
            {
                kind: 'data',
                name: 'from',
                type: 'core::starknet::contract_address::ContractAddress'
            },
            {
                kind: 'data',
                name: 'to',
                type: 'core::starknet::contract_address::ContractAddress'
            },
            {
                kind: 'data',
                name: 'value',
                type: 'core::felt252'
            }
        ]
    },
    {
        kind: 'struct',
        name: 'staking_stbull::erc20::erc20::Approval',
        type: 'event',
        members: [
            {
                kind: 'data',
                name: 'owner',
                type: 'core::starknet::contract_address::ContractAddress'
            },
            {
                kind: 'data',
                name: 'spender',
                type: 'core::starknet::contract_address::ContractAddress'
            },
            {
                kind: 'data',
                name: 'value',
                type: 'core::felt252'
            }
        ]
    },
    {
        kind: 'enum',
        name: 'staking_stbull::erc20::erc20::Event',
        type: 'event',
        variants: [
            {
                kind: 'nested',
                name: 'Transfer',
                type: 'staking_stbull::erc20::erc20::Transfer'
            },
            {
                kind: 'nested',
                name: 'Approval',
                type: 'staking_stbull::erc20::erc20::Approval'
            }
        ]
    }
];
