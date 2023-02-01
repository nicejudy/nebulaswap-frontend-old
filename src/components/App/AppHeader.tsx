import React from 'react'
import styled from 'styled-components'
import { Text, Button, Flex, Heading, IconButton, ArrowBackIcon, NotificationDot } from '@pancakeswap/uikit'
import { Link } from 'react-router-dom'
import { useExpertModeManager } from 'state/user/hooks'
import GlobalSettings from 'components/Menu/GlobalSettings'
import { useTranslation } from 'contexts/Localization'
import QuestionHelper from '../QuestionHelper'

interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string
  noConfig?: boolean
  isPool? : boolean
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  width: 100%;
  // border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

const AppHeader: React.FC<Props> = ({ title, subtitle, helper, backTo, noConfig = false, isPool = false }) => {
  const [expertMode] = useExpertModeManager()
  const { t } = useTranslation()

  return (
    <AppHeaderContainer>
      <Flex alignItems="center" mr={noConfig ? 0 : '16px'}>
        {backTo && (
          <IconButton as={Link} to={backTo}>
            <ArrowBackIcon width="32px" />
          </IconButton>
        )}
        <Flex flexDirection="column">
          <Heading as="h2" mb="8px" scale="xl" fontWeight="300">
            {title}
          </Heading>
          <Flex alignItems="center">
            {helper && <QuestionHelper text={helper} mr="4px" placement="top-start" />}
            {/* <Text color="textSubtle" fontSize="14px">
              {subtitle}
            </Text> */}
          </Flex>
        </Flex>
      </Flex>
      {!noConfig && (
        <Flex alignItems="center">
          <NotificationDot show={expertMode}>
            <GlobalSettings />
          </NotificationDot>
          {/* <Transactions /> */}
        </Flex>
      )}
      {isPool && (
        <Flex alignItems="center">
          <Button id="join-pool-button" as={Link} to="/add" width="100%">
            {t('Add Liquidity')}
          </Button>
        </Flex>
      )}
    </AppHeaderContainer>
  )
}

export default AppHeader
