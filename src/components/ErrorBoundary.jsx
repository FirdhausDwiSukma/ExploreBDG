import { Component } from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught:', error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <p className="error-boundary-icon">⚠️</p>
                    <h2>Oops, ada yang salah</h2>
                    <p>Komponen ini gagal dimuat. Coba refresh halaman.</p>
                    <button
                        className="btn-primary"
                        onClick={() => this.setState({ hasError: false, error: null })}
                    >
                        Coba Lagi
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ErrorBoundary
