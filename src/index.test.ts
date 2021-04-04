import { useForm } from './'
import { renderHook } from '@testing-library/react-hooks'

describe('useForm Hook', () => {
  it('updates every second', () => {
    const { result } = renderHook(() => useForm())
    const { result: result2 } = renderHook(() =>
      useForm({ username: 'user123' }),
    )
    const res = result.current
    const res2 = result2.current

    expect(res.data).toBe({})
    expect(res2.data.username).toBe('user123')
  })
})
