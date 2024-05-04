export const contractAddress =
    '0x0216d18ba55726482de63bb48572488c79c8500d6b7f0886bbb8932f1250f477';
export const contractABI = [
    {
        name: 'SimpleVault',
        type: 'impl',
        interface_name: 'test1::staking::ISimpleVault'
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
        name: 'test1::staking::ISimpleVault',
        type: 'interface',
        items: [
            {
                name: 'stake',
                type: 'function',
                inputs: [
                    {
                        name: 'amount',
                        type: 'core::integer::u256'
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
                        type: 'core::integer::u256'
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
                name: 'currentRewardsPerToken',
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
                name: 'currentUserRewards',
                type: 'function',
                inputs: [],
                outputs: [
                    {
                        type: 'core::integer::u256'
                    }
                ],
                state_mutability: 'external'
            }
        ]
    },
    {
        name: 'constructor',
        type: 'constructor',
        inputs: [
            {
                name: '_staking_token',
                type: 'core::starknet::contract_address::ContractAddress'
            },
            {
                name: '_rewards_token',
                type: 'core::starknet::contract_address::ContractAddress'
            },
            {
                name: '_rewardsStart',
                type: 'core::integer::u256'
            },
            {
                name: '_rewardsEnd',
                type: 'core::integer::u256'
            },
            {
                name: 'totalRewards',
                type: 'core::integer::u256'
            }
        ]
    },
    {
        kind: 'struct',
        name: 'test1::staking::SimpleRewards::Staked',
        type: 'event',
        members: [
            {
                kind: 'key',
                name: 'user',
                type: 'core::starknet::contract_address::ContractAddress'
            },
            {
                kind: 'data',
                name: 'amount',
                type: 'core::integer::u256'
            }
        ]
    },
    {
        kind: 'struct',
        name: 'test1::staking::SimpleRewards::Unstaked',
        type: 'event',
        members: [
            {
                kind: 'key',
                name: 'user',
                type: 'core::starknet::contract_address::ContractAddress'
            },
            {
                kind: 'data',
                name: 'amount',
                type: 'core::integer::u256'
            }
        ]
    },
    {
        kind: 'struct',
        name: 'test1::staking::SimpleRewards::Claimed',
        type: 'event',
        members: [
            {
                kind: 'key',
                name: 'user',
                type: 'core::starknet::contract_address::ContractAddress'
            },
            {
                kind: 'data',
                name: 'amount',
                type: 'core::integer::u256'
            }
        ]
    },
    {
        kind: 'struct',
        name: 'test1::staking::SimpleRewards::RewardsPerTokenUpdated',
        type: 'event',
        members: [
            {
                kind: 'key',
                name: 'accumulated',
                type: 'core::integer::u256'
            }
        ]
    },
    {
        kind: 'struct',
        name: 'test1::staking::SimpleRewards::UserRewardsUpdated',
        type: 'event',
        members: [
            {
                kind: 'key',
                name: 'user',
                type: 'core::starknet::contract_address::ContractAddress'
            },
            {
                kind: 'data',
                name: 'rewards',
                type: 'core::integer::u256'
            },
            {
                kind: 'data',
                name: 'checkpoint',
                type: 'core::integer::u256'
            }
        ]
    },
    {
        kind: 'enum',
        name: 'test1::staking::SimpleRewards::Event',
        type: 'event',
        variants: [
            {
                kind: 'nested',
                name: 'Staked',
                type: 'test1::staking::SimpleRewards::Staked'
            },
            {
                kind: 'nested',
                name: 'Unstaked',
                type: 'test1::staking::SimpleRewards::Unstaked'
            },
            {
                kind: 'nested',
                name: 'Claimed',
                type: 'test1::staking::SimpleRewards::Claimed'
            },
            {
                kind: 'nested',
                name: 'RewardsPerTokenUpdated',
                type: 'test1::staking::SimpleRewards::RewardsPerTokenUpdated'
            },
            {
                kind: 'nested',
                name: 'UserRewardsUpdated',
                type: 'test1::staking::SimpleRewards::UserRewardsUpdated'
            }
        ]
    }
];
