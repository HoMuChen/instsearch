export default theme => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.common.neutral}`,
    borderRadius: '4px',
    display: 'flex',
    paddingBottom: theme.spacing.unit * 0.5,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 0.5
  },
  icon: {
    marginRight: theme.spacing.unit,
    color: theme.palette.text.secondary
  },
  chips: {
    marginRight: theme.spacing.unit,
  },
  chip: {
    marginRight: theme.spacing.unit * 0.5,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
  }
});
