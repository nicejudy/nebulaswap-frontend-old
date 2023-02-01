import React, { useState } from 'react'
import { Token, Currency } from '@pancakeswap/sdk'
import { Button, Text, ErrorIcon, Flex, Message, Checkbox, Link, Tag, Grid } from '@pancakeswap/uikit'
import { AutoColumn } from 'components/Layout/Column'
import { useAddUserToken } from 'state/user/hooks'
import { getBscScanLink } from 'utils'
import truncateHash from 'utils/truncateHash'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCombinedInactiveList } from 'state/lists/hooks'
import { CurrencyLogo, ListLogo } from 'components/Logo'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { AutoRow, RowFixed } from 'components/Layout/Row'

interface ImportProps {
  tokens: Token[]
  handleCurrencySelect?: (currency: Currency) => void
}

const NameOverflow = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
  font-size: 12px;
`

function ImportToken({ tokens, handleCurrencySelect }: ImportProps) {
  const { chainId } = useActiveWeb3React()

  const { t } = useTranslation()

  const [confirmed, setConfirmed] = useState(false)

  const addToken = useAddUserToken()

  // use for showing import source on inactive tokens
  const inactiveTokenList = useCombinedInactiveList()

  return (
    <AutoColumn gap="lg">
      {tokens.map((token) => {
        const list = chainId && inactiveTokenList?.[chainId]?.[token.address]?.list
        const address = token.address ? `${truncateHash(token.address)}` : null
        return (
          <Grid key={token.address} gridTemplateRows="1fr" gridGap="4px">
            {/* {list !== undefined ? (
              <Tag
                variant="success"
                outline
                scale="sm"
                startIcon={list.logoURI && <ListLogo logoURI={list.logoURI} size="12px" />}
              >
                {t('via')} {list.name}
              </Tag>
            ) : (
              <Tag variant="failure" outline scale="sm" startIcon={<ErrorIcon color="failure" />}>
                {t('Unknown Source')}
              </Tag>
            )} */}
            <Flex justifyContent="space-between" width="100%">
              <Flex alignItems="center">
                <CurrencyLogo currency={token} size="32px" style={{ opacity: '1' }} />
                <AutoColumn gap="4px" style={{ opacity: '1', marginLeft: '10px' }} >
                  <AutoRow>
                    <Text fontSize="16px">{token.symbol}</Text>
                    <Text fontSize="14px" color="textDisabled" ml="8px">
                      <NameOverflow title={token.name}>{token.name}</NameOverflow>
                    </Text>
                  </AutoRow>
                  {list && list.logoURI && (
                    <RowFixed>
                      <Text small fontSize="14px" mr="4px" color="textSubtle">
                        {t('via')} {list.name}
                      </Text>
                      <ListLogo logoURI={list.logoURI} size="12px" />
                    </RowFixed>
                  )}
                  {!list && (
                    <RowFixed>
                      <Text small fontSize="14px" mr="4px" color="textSubtle">
                        {t('Unknown Source')}
                      </Text>
                    </RowFixed>
                  )}
                </AutoColumn>
              </Flex>
              {chainId && (
                <Link fontSize="16px" href={getBscScanLink(token.address, 'address', chainId)} external>
                  {address}
                </Link>
              )}
            </Flex>
          </Grid>
        )
      })}
      {/* <Message variant="primary"> */}
      <Flex flexDirection="column" justifyContent="center" alignItems="center" p="30px">
        <img src="/images/warning.png" alt="warning.png" />
        <Text fontSize="24px" my="30px">
          {t('Trade at your own risk!')}
        </Text>
        <Text fontSize="14px" textAlign="center">
          {t(
            'Anyone can create a token, including creating fake versions of existing tokens that claim to represent projects. If you purchase this token, you may not be able to sell it back.',
          )}
        </Text>
      </Flex>
      {/* </Message> */}

      <Flex justifyContent="space-center" alignItems="center">
        {/* <Flex alignItems="center" onClick={() => setConfirmed(!confirmed)}>
          <Checkbox
            scale="sm"
            name="confirmed"
            type="checkbox"
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
          />
          <Text ml="8px" style={{ userSelect: 'none' }}>
            {t('I understand')}
          </Text>
        </Flex> */}
        <Button
          variant="primary"
          // disabled={!confirmed}
          width="100%"
          onClick={() => {
            tokens.map((token) => addToken(token))
            if (handleCurrencySelect) {
              handleCurrencySelect(tokens[0])
            }
          }}
          className=".token-dismiss-button"
        >
          {t('Import')}
        </Button>
      </Flex>
    </AutoColumn>
  )
}

export default ImportToken
